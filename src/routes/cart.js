require('dotenv').config()
const router = require('express').Router()

const mysql = require('../dbconfig')
const cart = require('../model/cart')
const { admin } = require('../middleware')

router.get('/', admin, (req, res) => {
  mysql.execute(cart.carts, [], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        msg: 'error'
      })
    }
  })
})

router.get('/:id_user', (req, res) => {
  const { id_user } = req.params
  mysql.execute(cart.carts_by_id_user, [id_user], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        msg: 'error'
      })
    }
  })
})

router.post('/insert', (req, res) => {
  const { id_item, id_user, item_name, price, number_of_item } = req.body
  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(cart.insert_cart, [id_item, id_user, item_name, price, number_of_item, created_on, updated_on], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        msg: 'error'
      })
    }
  })
})

router.put('/update/:id_cart', (req, res) => {
  const { number_of_item } = req.body
  const { id_cart } = req.params
  const updated_on = new Date()
  mysql.execute(cart.update_cart, [number_of_item, updated_on, id_cart], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        msg: 'error'
      })
    }
  })
})

router.delete('/delete/:id_cart', (req, res) => {
  const { id_cart } = req.params
  mysql.execute(cart.delete_cart, [id_cart], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        msg: 'error'
      })
    }
  })
})

module.exports = router