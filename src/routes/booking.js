require('dotenv').config()
const router = require('express').Router()

const mysql = require('../dbconfig')
const booking = require('../model/booking')
const { admin } = require('../middleware')

router.post('/userBooking', (req, res) => {
  const { name, zipcode, total_payment } = req.body
  const { id_user } = req.query
  const no_booking = `Booking ${new Date() / 1000}`
  const date_booking = new Date()
  mysql.execute(booking.insert_booking, [no_booking, date_booking, name, id_user, zipcode, total_payment, false], (err, result, field) => {
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

router.post('/insert_detailBooking', (req, res) => {
  const { no_booking, id_item, item_name, item_price, amount } = req.query
  mysql.execute(booking.insert_booking_detail, [no_booking, id_item, item_name, item_price, amount], (err, result, field) => {
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

router.get('/detailBooking/:id_user', (req, res) => {
  const { id_user } = req.params
  mysql.execute(booking.booking_detail, [id_user], (err, result, field) => {
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

router.delete('/delete/:no_booking', admin, (req, res) => {
  const { no_booking } = req.params
  mysql.execute(booking.delete_booking, [no_booking], (err, result, field) => {
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