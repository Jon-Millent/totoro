// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const baseUrl = __dirname
const path = require('path');
const accessDir = path.join(baseUrl, 'access')

class Preload {

  // 获取exe图标
  static async getEXEIconFormPath(exeFilePath) {

    const { writeFileSync, existsSync } = require('fs')
    const JImgHelper = require('./src/modules/JimgHelper')
    const iconPromise = require('icon-promise');
    const shortid = require('shortid')

    if (!exeFilePath) {
      return null
    }

    if (!existsSync(exeFilePath)) {
      return null
    }

    const fileName = shortid.generate()

    // 这里因为有的应用没有大图标,且返回大图标的时候会有问题,这里就判断不支持大图标的返回小图标
    const largeInfo = await iconPromise.getIcon256(exeFilePath, fileName)
    const smallInfo = await iconPromise.getIcon48(exeFilePath, fileName)

    const largerBuffer = Buffer.from(largeInfo.Base64ImageData, 'base64')
    const smallBuffer = Buffer.from(smallInfo.Base64ImageData, 'base64')

    let bigTransparent = await JImgHelper.getImageTransparentRatioFromBuffer(
      largerBuffer
    )
    let smallTransparent = await JImgHelper.getImageTransparentRatioFromBuffer(
      smallBuffer
    )

    const outputPath = path.join(accessDir, 'icons/' + fileName + '.png')

    if (bigTransparent - smallTransparent <= 0.1) {
      writeFileSync(outputPath, largerBuffer)
    } else {
      writeFileSync(outputPath, smallBuffer)
    }

    return outputPath
  }

  // 更换壁纸
  static async changeWallpaper(path) {
    const wallpaper = require('wallpaper');

    return await wallpaper.set(path)
  }

  // 获取当前壁纸
  static async getWallpaper() {
    const wallpaper = require('wallpaper');

    return await wallpaper.get()
  }

}

window.totoroNative = Preload