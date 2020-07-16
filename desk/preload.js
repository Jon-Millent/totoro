// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const baseUrl = __dirname
const path = require('path');
const accessDir = path.join(baseUrl, 'access')
const { remote } = require('electron')

const Store = require('electron-store');
const store = new Store();

class Preload {

  static async sleep(time = 1000) {
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve()
      }, time)
    })
  }

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
    // path like E:\\xxx\\xxx.jpg' warn: path \ => \\
    const wallpaper = require('wallpaper');

    return await wallpaper.set(path)
  }

  // 获取当前壁纸
  static async getWallpaper() {
    const wallpaper = require('wallpaper');

    return await wallpaper.get()
  }

  // 通过path启动应用
  static async launchApplicationFromPath(executablePath) {
    let child = require('child_process').execFile;
    return  new Promise(resolve => {
      child(executablePath, function(err, data) {
        if(err){
          resolve({err, data: null})
          return;
        }
        resolve({data: data, err: null})
      });
    })
  }

  // 通过link启动应用
  static async launchApplicationFromShell(link) {
    let shell = require('electron').shell;
    return shell.openExternal(link);
  }

  // 储存
  static setItem(key, value) {
    store.set(key, value)
  }
  static getItem(key) {
    store.get(key)
  }

  static showChooseFileDialog(filter) {
    return new Promise(resolve => {
      remote.dialog.showOpenDialog(filter || {}).then(result => {
        resolve({
          result
        })
      }).catch(err => {
        resolve({
          err
        })
      })
    })
  }

  static async getFileNativeImage(path = '', config) {
    return await remote.app.getFileIcon(path, Object.assign({
      size: 'normal'
    }, config))
  }

}

window.totoroNative = Preload
