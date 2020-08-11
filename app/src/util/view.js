
class ViewTool {
  static getGlobalViewSize() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$viewTool = ViewTool
  }
}
