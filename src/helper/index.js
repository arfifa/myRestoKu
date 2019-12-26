const multer = require('multer')
path = require('path')

module.exports = {
  storageItem: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/imagesItem')
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
  }),
  storageRestaurant: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/imagesRestaurant')
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
  })
}
