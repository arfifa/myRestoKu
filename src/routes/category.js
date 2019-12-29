require('dotenv').config()
const router = require('express').Router()

const mysql = require('../dbconfig')
const category = require('../model/category')

router.get('/', (req, res) => {
  mysql.execute(category.categories, [], (err, result, field) => {
    res.send(result)
  })
})

router.post('/insert', (req, res) => {
  const { category_name } = req.body
  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(category.insert_category, [category_name, created_on, updated_on], (err, result, field) => {
    if (err == null) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 400,
        result: "error"
      })
    }
  })
})

router.put('/update/:id_category', (req, res) => {
  const { category_name } = req.body
  const { id_category } = req.params
  const updated_on = new Date()

  mysql.execute(category.update_category, [category_name, updated_on, id_category], (err, result, field) => {
    if (err == null) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 400,
        result: "error"
      })
    }
  })
})

router.delete('/delete/:id_category', (req, res) => {
  const { id_category } = req.params
  mysql.execute(category.delete_category, [id_category], (err, result, field) => {
    if (err == null) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 400,
        result: "error"
      })
    }
  })
})

module.exports = router