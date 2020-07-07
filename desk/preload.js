// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


const { writeFileSync, existsSync } = require('fs')
const JImgHelper = require('./src/modules/JimgHelper')
const iconPromise = require('icon-promise');
const path = require('path');
const shortid = require('shortid')

const baseUrl = __dirname

const accessDir = path.join(baseUrl, 'access')

window.totoroNative = {

  // 获取exe图标
  async getEXEIconFormPath(exeFilePath) {
    if (!exeFilePath) {
      return null
    }

    if (!existsSync(exeFilePath)) {
      return null
    }

    const fileName = shortid.generate()
    const largeInfo = await iconPromise.getIcon256(exeFilePath, fileName)
    const smallInfo = await iconPromise.getIcon48(exeFilePath, fileName)

    const largerBuffer = Buffer.from(largeInfo.Base64ImageData, 'base64') // Ta-da
    const smallBuffer = Buffer.from(smallInfo.Base64ImageData, 'base64') // Ta-da

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

}