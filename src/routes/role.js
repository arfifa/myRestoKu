require('dotenv').config()
const router = require('express').Router()

const mysql = require('../dbconfig')
const role = require('../model/role')

router.get('/', (req, res) => {
  mysql.execute(role.roles, [], (err, result, field) => {
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

router.post('/insert', (req, res) => {
  const { role_name } = req.body
  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(role.insert_role, [role_name, created_on, updated_on], (err, result, field) => {
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

router.put('/update/:id_role', (req, res) => {
  const { role_name } = req.body
  const { id_role } = req.params
  const updated_on = new Date()
  mysql.execute(role.update_role, [role_name, updated_on, id_role], (err, result, field) => {
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

router.delete('/delete/:id_role', (req, res) => {
  const { id_role } = req.params
  mysql.execute(role.delete_role, [id_role], (err, result, field) => {
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