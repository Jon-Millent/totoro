// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const baseUrl = __dirname
const path = require('path');
const accessDir = path.join(baseUrl, 'access')
const accessDirName = '/access'
const { remote } = require('electron')
const { v4: uuidv4 } = require('uuid');

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

    return path.join(accessDirName, '/icons/' + fileName + '.png')
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
    return store.get(key)
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

  // 获取桌面应用[名称, path, icon]
  static async getDesktopApplications() {
    const { shell } = require('electron');

    const { readdirSync } = require('fs')
    let desktopPath = remote.app.getPath('desktop')
    let fileList = readdirSync(desktopPath)
    let outputList = []

    for(let i=0; i<fileList.length; i++) {
      let item = fileList[i]
      if(item.indexOf('.lnk') !== -1) {
        try {
          let tPath = path.join(desktopPath, item)
          const info = shell.readShortcutLink(
            tPath
          );

          let icon = ''

          console.log(info.target, 'info.target')
          try {
            icon = await Preload.getEXEIconFormPath(info.target)
          } catch (e) {
            console.log(e, 'getEXEIconFormPath')
          }

          info.cwd && outputList.push({
            name: item.replace('.lnk', ''),
            icon,
            target: info.target,
            cwd: info.cwd,
            id: uuidv4()
          })

        } catch (e) {
          //
          console.log(e, 'e')
        }
      }
    }

    return outputList
  }

}

window.totoroNative = Preload
