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

  static launchApplicationFromPath (path) {
    return window.totoroNative.launchApplicationFromPath(path)
  }

  static launchApplicationFromShell(link) {
    return window.totoroNative.launchApplicationFromShell(link)
  }

  static async getWallpaper() {
    return window.totoroNative.getWallpaper()
  }

  // 获取桌面应用信息
  static async getDesktopApplications() {
    let list = await window.totoroNative.getDesktopApplications()
    console.log(list)
  }

}

export default {
  install(Vue) {
    Vue.prototype.$totoroNative = TotoroNative
  }
}
