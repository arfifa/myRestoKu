require('dotenv').config()
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const mysql = require('../dbconfig')
const { auth, admin } = require('../middleware')
const user = require('../model/user')

router.post('/login', (req, res) => {
  const { username, password } = req.body
  mysql.execute(user.user_login, [username], (err, result, field) => {
    if (result.length > 0) {
      if (bcrypt.compareSync(password, result[0].password)) {
        const { id_role, id_user } = result[0]
        const token = jwt.sign({ id_role, username, id_user }, process.env.APP_KEY, { expiresIn: '1d' })
        const created_on = new Date()
        mysql.execute(user.get_token, [username], (err, result, field) => {
          if (result.length === 0) {
            mysql.execute(user.insert_token, [token, username], (err, result, field) => {
              res.send({ success: true, token })
            })
          } else {
            const expiredToken = jwt.decode(result[0].id_token, process.env.APP_KEY)
            let thisTime = Math.floor(created_on / 1000)

            if (expiredToken.exp >= thisTime) {
              res.send({
                success: true,
                token: result[0].id_token
              })
            } else {
              mysql.execute(user.update_token, [token, username], (err, result, field) => {
                res.send({ success: true, token })
              })
            }
          }
        })
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
  const { no_telp, username, password, date_birth, gender, fullname, email, id_role } = req.body
  const enc_pass = bcrypt.hashSync(password)

  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(user.insert_user, [fullname, date_birth, gender, no_telp, email, username, enc_pass, id_role, created_on, updated_on], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        result: "error"
      })
    }
  })
})

router.get('/', auth, (req, res) => {
  mysql.execute(user.users, [], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        result: "error"
      })
    }
  })
})

router.get('/:id_user', auth, (req, res) => {
  const { id_user } = req.params
  mysql.execute(user.user_by_id, [id_user], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        result: "error"
      })
    }
  })
})

router.get('/detail_user/:id_user', auth, (req, res) => {
  const { id_user } = req.params
  mysql.execute(user.detail_user_by_id, [id_user], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        result: "error"
      })
    }
  })
})


router.get('/update/:id_user', auth, (req, res) => {
  const { id_user } = req.params
  mysql.execute(user.user_by_id, [id_user], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        result: "error"
      })
    }
  })
})

router.delete('/delete/:id_user', auth, (req, res) => {
  const { id_user } = req.params
  mysql.execute(user.delete_user, [id_user], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result: result
      })
    } else {
      res.send({
        success: false,
        result: "error"
      })
    }
  })
})

router.delete('/logout/:username', auth, (req, res) => {
  const { username } = req.params
  mysql.execute(user.delete_token, [username], (err, result, field) => {
    console.log(err);
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