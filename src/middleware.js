jwt = require('jsonwebtoken')
token = require('./model/user')
mysql = require('./dbconfig')

const auth = (req, res, next) => {
  if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
    const jwt_token = req.headers['authorization'].substr(7)
    try {
      const user = jwt.verify(jwt_token, process.env.APP_KEY)
      mysql.execute(token.get_token, [user.username], (err, result, field) => {
        result.length > 0 ? next() : res.send({ success: false, msg: 'You must be login first' })
      })
    } catch (e) {
      res.send({ success: false, msg: e })
    }
  } else {
    res.send({ success: false, msg: 'You must be login first' })
  }
}

const admin = (req, res, next) => {
  const jwt_token = req.headers['authorization'].substr(7)
  try {
    const user = jwt.verify(jwt_token, process.env.APP_KEY)
    if (user.id_role == 1) {
      next()
    } else {
      res.send({ success: false, msg: 'You not Admin' })
    }
  } catch (e) {
    res.send({ success: false, msg: e })
  }
}

const karyawan = (req, res, next) => {
  const jwt_token = req.headers['authorization'].substr(7)
  try {
    const user = jwt.verify(jwt_token, process.env.APP_KEY)
    if (user.id_role == 2 || user.id_role == 1) {
      next()
    } else {
      res.send({ success: false, msg: 'You not Karyawan' })
    }
  } catch (e) {
    res.send({ success: false, msg: e })
  }
}

module.exports = { auth, admin, karyawan }