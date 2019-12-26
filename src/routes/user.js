require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const mysql = require('../dbconfig')
const { auth } = require('../middleware')
const user = require('../model/user')

router.post('/login', (req, res) => {
  const { username, password } = req.body
  mysql.execute(user.user_login, [username], (err, result, field) => {
    if (result.length > 0) {
      if (bcrypt.compareSync(password, result[0].password)) {
        const { id_role } = result[0]
        const auth = jwt.sign({ id_role, username }, process.env.APP_KEY, { expiresIn: '1d' })
        res.send(
          {
            success: true,
            auth
          }
        )
      } else {
        res.send({
          success: false,
          msg: "Incorrect Password"
        })
      }
    } else {
      res.send({
        success: false,
        msg: "Username not found"
      })
    }
  })
})

router.post('/register', (req, res) => {
  const { name, id_card, address, no_phone, username, password, id_role } = req.body
  const enc_pass = bcrypt.hashSync(password)

  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(user.insert_user, [name, id_card, address, no_phone, username, enc_pass, id_role, created_on, updated_on], (err, result, field) => {
    res.send(result)
  })
})

router.get('/:id_user', auth, (req, res) => {
  const { id_user } = req.params
  mysql.execute(user.user_by_id, [id_user], (err, result, field) => {
    res.send({
      success: true,
      data: result[0]
    })
  })
})

router.delete('/delete/:id_user', auth, (req, res) => {
  const { id_user } = req.params
  mysql.execute(user.delete_user, [id_user], (err, result, field) => {
    res.send(result)
  })
})

module.exports = router