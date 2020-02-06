require('dotenv').config()
const router = require('express').Router()
var nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')

const mysql = require('../../src/dbconfig')
const {
  mail_check
} = require('../model/user')

var length = 8
var newPassword = ''
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
var charactersLength = characters.length;
for (var i = 0; i < length; i++) {
  newPassword += characters.charAt(Math.floor(Math.random() * charactersLength))
}

/* FORGOT PASSWORD */
router.post('/forgot_password', (req, res) => {
  const {
    email
  } = req.body
  mysql.execute(mail_check, [email], (err, result, field) => {
    if (result.length === 0) {
      res.send({
        succes: false,
        msg: 'Username not Found'
      })
    } else {

      password_decode = bcrypt.hashSync(newPassword)
      mysql.execute('UPDATE users SET password = ? WHERE email = ?', [password_decode, email], (err, result2, field) => {
        return
      })
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'forgot.icecreamo@gmail.com',
          pass: process.env.EMAIL_PASSWORD
        }
      })

      var mailOptions = {
        from: 'forgot.icecreamo@gmail.com',
        to: email,
        subject: '<Dont Repply Email>',
        text: 'your password is ' + newPassword
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
      })

      res.send({
        succes: true,
        msg: 'check your email'
      })
    }
  })
})


module.exports = router