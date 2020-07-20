class Database {
  setItem(key, value) {
    window.totoroNative.setItem(key, value)
  }

  getItem(key) {
    return window.totoroNative.getItem(key)
  }

  /*
  数据结构
  init: false,
  version: '1.x.x.x',
  lang: 'zh_cn',
  theme: {
    mode: 'dark', dark | white
  },
  desktop: [
    {
      icon: '',
      appName: '',
      path: '',
      id: '',
      type: 'exe', exe | folder
    }
  ],
  launch: [
    {
      icon: '',
      appName: '',
      path: '',
      id: ''
    }
  ],
  docker: [
    {
      icon: '',
      appName: '',
      path: '',
      id: ''
    }
  ]
  */

  setDesktop(arrList = []) {
    this.setItem('desktop', arrList)
  }

  getDesktop() {
    return this.getItem('desktop') || []
  }

  isInit() {
    return this.getItem('init')
  }

  init() {
    this.setItem('init', true)
    this.setItem('version', '1.0.0')
    this.setItem('lang', 'zh_cn')
    this.setItem('theme', {
      mode: 'dark'
    })
    this.setItem('desktop', [])
    this.setItem('launch', {
      left: [],
      right: []
    })
    this.setItem('docker', [])
  }

  unInit() {
    this.setItem('init', false)
    this.setItem('version', '1.0.0')
    this.setItem('lang', 'zh_cn')
    this.setItem('theme', {
      mode: 'dark'
    })
    this.setItem('desktop', [])
    this.setItem('launch', {
      left: [],
      right: []
    })
    this.setItem('docker', [])
  }
}


export default {
  install(Vue) {
    Vue.prototype.$database = new Database()
  }
}
