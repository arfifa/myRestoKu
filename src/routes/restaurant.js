require('dotenv').config()
const router = require('express').Router()
const multer = require('multer')

const mysql = require('../dbconfig')
const restaurant = require('../model/restaurant')
const upload = require('../helper')

const uploadImageLogo = multer({ storage: upload.storageRestaurant }).single('logo')

router.get('/', (req, res) => {
  mysql.execute(restaurant.restaurants, [], (err, result, field) => {
    res.send(result)
  })
})

router.post('/insert', uploadImageLogo, (req, res) => {
  const { name, longitude, latitude, description } = req.body
  const logo = req.file.filename

  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(restaurant.insert_restaurant, [name, logo, longitude, latitude, description, created_on, updated_on], (err, result, field) => {
    console.log(err)
    res.send(result)
  })
})

router.put('/update/:id_restaurant', (req, res) => {
  const { name, logo, longitude, latitude, description } = req.body
  const { id_restaurant } = req.params
  const updated_on = new Date()

  mysql.execute(restaurant.update_restaurant, [name, logo, longitude, latitude, description, updated_on, id_restaurant], (err, result, field) => {
    console.log(err);
    res.send(result)
  })
})

router.delete('/delete/:id_restaurant', (req, res) => {
  const { id_restaurant } = req.params
  mysql.execute(restaurant.delete_restaurant, [id_restaurant], (err, result, field) => {
    res.send(result)
  })
})

module.exports = router