const Jimp = require('jimp');

class JimgHelper {
  static getImageTransparentRatioFromBuffer(imageBuffer) {
    return new Promise(resolve => {

      Jimp.read(imageBuffer)
        .then(image => {

          let allCount = 0
          let alphaCount = 0
          image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            // x, y is the position of this pixel on the image
            // idx is the position start position of this rgba tuple in the bitmap Buffer
            // this is the image

            allCount++
            // let red = this.bitmap.data[idx];
            // let green = this.bitmap.data[idx + 1];
            // let blue = this.bitmap.data[idx + 2];
            let alpha = this.bitmap.data[idx + 3];
            if(alpha === 0) {
              alphaCount++
            }

          });

          resolve(alphaCount / allCount)

        })
        .catch(err => {
          // Handle an exception.
          resolve(0)
        });

    })
  }
}


module.exports = JimgHelper