class TotoroNative {

  static get MS_SETTINGS() {
    return {
      settings: 'ms-settings',
      outlookcal: 'outlookcal:calendar',
      explorer: 'explorer'
    }
  }

  static get MS_SYSTEM_APP() {
    return {
      calc: 'calc.exe'
    }
  }

  static async sleep(time = 1000) {
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve()
      }, time)
    })
  }

  static launchApplicationFromPath (path) {
    return window.totoroNative.launchApplicationFromPath(path)
  }

  static launchApplicationFromShell(link) {
    return window.totoroNative.launchApplicationFromShell(link)
  }

  static async getWallpaper() {
    return window.totoroNative.getWallpaper()
  }

  static async showChooseFileDialog(filter = {}) {
    return await window.totoroNative.showChooseFileDialog(filter)
  }

  static async getEXEIconFormPath(path = '') {
    return await window.totoroNative.getEXEIconFormPath(path)
  }

  static async getFileNativeImage(path = '', config = {}){
    return await window.totoroNative.getFileNativeImage(path, config)
  }

  static async getDesktopApplications() {
    return await window.totoroNative.getDesktopApplications()
  }


}

export default {
  install(Vue) {
    Vue.prototype.$totoroNative = TotoroNative
  }
}
