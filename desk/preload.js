// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


// const { readFileSync } = require('fs')
const fileIcon = require('extract-file-icon')

window.totoroNative = {
  // 获取exe图标
  getEXEIconFormPath() {
    const icon = fileIcon('E:\\work\\apk\\getipqrcode\\getIpQrCode.exe', 32);
    console.log(icon.toString('base64'))
  }
}