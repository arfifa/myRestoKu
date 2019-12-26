require('dotenv').config()
const router = require('express').Router()
const multer = require('multer')

const mysql = require('../dbconfig')
const item = require('../model/item')
const upload = require('../helper')

const uploadImageItem = multer({ storage: upload.storageItem }).single('images')

router.get('/', (req, res) => {
  const { item_name, lowers_price, highest_price, ratings } = req.query
  if (item_name) {
    const sql = `SELECT * FROM items WHERE item_name LIKE '%${item_name}%' `
    mysql.execute(sql, [], (err, result, field) => {
      res.send(result)
    })
  } else if (lowers_price && highest_price) {
    const sql = `SELECT * FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price}`
    mysql.execute(sql, [], (err, result, field) => {
      res.send(result)
    })
  } else if (ratings) {
    const sql = `SELECT * FROM items WHERE ratings >= ${ratings}`
    mysql.execute(sql, [], (err, result, field) => {
      res.send(result)
    })
  } else {
    mysql.execute(item.items, [], (err, result, field) => {
      res.send(result)
    })
  }
})

router.get('/order_by', (req, res) => {
  const { item_name, ratings, price, date_updated, asc, desc } = req.query

  if (item_name) {
    if (item_name && asc) {
      mysql.execute(item.item_orderBy_name_asc, [], (err, result, field) => {
        res.send(result)
      })
    } else if (item_name && desc) {
      mysql.execute(item.item_orderBy_name_desc, [], (err, result, field) => {
        res.send(result)
      })
    }
  } else if (ratings) {
    if (ratings && asc) {
      mysql.execute(item.item_orderBy_ratings_asc, [], (err, result, field) => {
        res.send(result)
      })
    } else if (ratings && desc) {
      mysql.execute(item.item_orderBy_ratings_desc, [], (err, result, field) => {
        res.send(result)
      })
    }
  } else if (price) {
    if (price && asc) {
      mysql.execute(item.item_orderBy_price_asc, [], (err, result, field) => {
        res.send(result)
      })
    } else if (price && desc) {
      mysql.execute(item.item_orderBy_price_desc, [], (err, result, field) => {
        res.send(result)
      })
    }
  } else if (date_updated) {
    if (date_updated && asc) {
      mysql.execute(item.item_orderBy_date_updated_asc, [], (err, result, field) => {
        res.send(result)
      })
    } else if (date_updated && desc) {
      mysql.execute(item.item_orderBy_date_updated_desc, [], (err, result, field) => {
        res.send(result)
      })
    }
  }
})

router.get('/itempage', (req, res) => {
  const { page, limits } = req.query
  if (page == 1) {
    const initial_data = page - 1
    const sql = `SELECT * FROM items ORDER BY item_name ASC LIMIT ${initial_data}, ${limits}`
    mysql.execute(sql, [], (err, result, field) => {
      res.send(result)
    })
  } else if (page >= 2) {
    const initial_data = (page * limits) - limits
    const sql = `SELECT * FROM items ORDER BY item_name ASC LIMIT ${initial_data}, ${limits}`
    mysql.execute(sql, [], (err, result, field) => {
      res.send(result)
    })
  }
})

router.post('/insert', uploadImageItem, (req, res) => {
  const { id_category, item_name, price, description, ratings } = req.body
  const images = req.file.filename
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