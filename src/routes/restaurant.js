require('dotenv').config()
const router = require('express').Router()
const multer = require('multer')

const mysql = require('../dbconfig')
const restaurant = require('../model/restaurant')
const upload = require('../helper')
const { auth, admin } = require('../middleware')

const uploadImageLogo = multer(
  {
    storage: upload.storageRestaurant,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    }
  }
).single('logo')

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only')
  }
}

router.get('/', (req, res) => {
  mysql.execute(restaurant.restaurants, [], (err, result, field) => {
    if (err == null) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 400,
        msg: 'error'
      })
    }
  })
})

router.post('/insert', uploadImageLogo, auth, admin, (req, res) => {
  const { id_user, name, longitude, latitude, description } = req.body
  const logo = req.file.filename

  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(restaurant.insert_restaurant, [id_user, name, logo, longitude, latitude, description, created_on, updated_on], (err, result, field) => {
    if (err == null) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 400,
        msg: 'error'
      })
    }
  })
})

router.put('/update/:id_restaurant', auth, admin, (req, res) => {
  const { name, logo, longitude, latitude, description } = req.body
  const { id_restaurant } = req.params
  const updated_on = new Date()

  mysql.execute(restaurant.update_restaurant, [name, logo, longitude, latitude, description, updated_on, id_restaurant], (err, result, field) => {
    if (err == null) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 400,
        msg: 'error'
      })
    }
  })
})

router.delete('/delete/:id_restaurant', auth, admin, (req, res) => {
  const { id_restaurant } = req.params
  mysql.execute(restaurant.delete_restaurant, [id_restaurant], (err, result, field) => {
    if (err == null) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 400,
        msg: 'error'
      })
    }
  })
})

module.exports = router