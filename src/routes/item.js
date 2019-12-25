require('dotenv').config()
const router = require('express').Router()

const mysql = require('../dbconfig')
const item = require('../model/item')

router.get('/', (req, res) => {
  mysql.execute(item.items, [], (err, result, field) => {
    res.send(result)
  })
})

router.post('/insert', (req, res) => {
  const { id_category, item_name, price, description, images, ratings } = req.body
  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(item.insert_item, [id_category, item_name, price, description, images, ratings, created_on, updated_on], (err, result, field) => {
    res.send(result)
  })
})

router.put('/update/:id_item', (req, res) => {
  const { id_category, item_name, price, description, images, ratings } = req.body
  const { id_item } = req.params
  const updated_on = new Date()

  mysql.execute(item.update_item, [id_category, item_name, price, description, images, ratings, updated_on, id_item], (err, result, field) => {
    res.send(result)
  })
})

router.delete('/delete/:id_item', (req, res) => {
  const { id_item } = req.params
  mysql.execute(item.delete_item, [id_item], (err, result, field) => {
    res.send(result)
  })
})

module.exports = router