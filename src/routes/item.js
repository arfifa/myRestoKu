require('dotenv').config()
const router = require('express').Router()
const multer = require('multer')

const mysql = require('../dbconfig')
const item = require('../model/item')
const upload = require('../helper')
const {
  karyawan
} = require('../middleware')

const uploadImageItem = multer({
  storage: upload.storageItem,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('images')

//check file type
function checkFileType(file, cb) {
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  //check mime
  const mimetype = filetypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only')
  }
}

router.get('/', (req, res) => {
  const {
    item_name,
    lowers_price,
    highest_price,
    ratings,
    sort,
    limits,
    page
  } = req.query
  if (item_name) {
    if (item_name && sort && limits && page) {
      if (sort == 'ASC') {
        if (page == 1) {
          const initial_data = page - 1
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE item_name LIKE '%${item_name}%' ORDER BY item_name ASC, date_created ASC LIMIT ${initial_data}, ${limits}`

          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE item_name LIKE '%${item_name}%'`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        } else if (page >= 2) {
          const initial_data = (page * limits) - limits
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE item_name LIKE '%${item_name}%' ORDER BY item_name ASC, date_created ASC LIMIT ${initial_data}, ${limits}`

          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE item_name LIKE '%${item_name}%'`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        }
      } else {
        if (page == 1) {
          const initial_data = page - 1
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE item_name LIKE '%${item_name}%' ORDER BY item_name DESC, date_created DESC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE item_name LIKE '%${item_name}%'`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        } else if (page >= 2) {
          const initial_data = (page * limits) - limits
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE item_name LIKE '%${item_name}%' ORDER BY item_name DESC, date_created DESC LIMIT ${initial_data}, ${limits}`

          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE item_name LIKE '%${item_name}%'`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        }
      }
    } else if (item_name && sort) {
      if (sort == 'ASC') {
        const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE item_name LIKE '%${item_name}%' ORDER BY item_name ASC`
        mysql.execute(sql, [], (err, result, field) => {
          if (err == null) {
            res.send({
              success: true,
              result: result
            })
          } else {
            res.send({
              success: false,
              msg: "error"
            })
          }
        })
      } else {
        const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE item_name LIKE '%${item_name}%' ORDER BY item_name DESC`
        mysql.execute(sql, [], (err, result, field) => {
          if (err == null) {
            res.send({
              success: true,
              result: result
            })
          } else {
            res.send({
              success: false,
              msg: "error"
            })
          }
        })
      }
    } else {
      const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE item_name LIKE '%${item_name}%' `
      mysql.execute(sql, [], (err, result, field) => {
        if (err == null) {
          res.send({
            success: true,
            result: result
          })
        } else {
          res.send({
            success: false,
            msg: "error"
          })
        }
      })
    }
  } else if (lowers_price && highest_price) {
    if (lowers_price && highest_price && sort && limits && page) {
      if (sort == 'ASC') {
        if (page == 1) {
          const initial_data = page - 1
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price} ORDER BY price ASC, date_created ASC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price}`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        } else if (page >= 2) {
          const initial_data = (page * limits) - limits
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price} ORDER BY price ASC, date_created ASC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price}`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        }
      } else {
        if (page == 1) {
          const initial_data = page - 1
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price} ORDER BY price DESC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price}`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        } else if (page >= 2) {
          const initial_data = (page * limits) - limits
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price} ORDER BY price DESC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price}`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        }
      }
    } else if (highest_price && lowers_price && sort) {
      if (sort == 'ASC') {
        const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price} ORDER BY price ASC`
        mysql.execute(sql, [], (err, result, field) => {
          if (err == null) {
            res.send({
              success: true,
              result: result
            })
          } else {
            res.send({
              success: false,
              msg: "error"
            })
          }
        })
      } else {
        const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price} ORDER BY price DESC`
        mysql.execute(sql, [], (err, result, field) => {
          if (err == null) {
            res.send({
              success: true,
              result: result
            })
          } else {
            res.send({
              success: false,
              msg: "error"
            })
          }
        })
      }
    } else {
      const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE price >= ${lowers_price} AND price <= ${highest_price} `
      mysql.execute(sql, [], (err, result, field) => {
        if (err == null) {
          res.send({
            success: true,
            result: result
          })
        } else {
          res.send({
            success: false,
            msg: "error"
          })
        }
      })
    }
  } else if (ratings) {
    if (ratings && sort && limits && page) {
      if (sort == 'ASC') {
        if (page == 1) {
          const initial_data = page - 1
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE ratings >= ${ratings} ORDER BY ratings ASC, date_created ASC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE ratings >= ${ratings}`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        } else if (page >= 2) {
          const initial_data = (page * limits) - limits
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE ratings >= ${ratings} ORDER BY ratings ASC, date_created ASC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE ratings >= ${ratings}`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        }
      } else {
        if (page == 1) {
          const initial_data = page - 1
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE ratings >= ${ratings} ORDER BY ratings DESC, date_created DESC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE ratings >= ${ratings}`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        } else if (page >= 2) {
          const initial_data = (page * limits) - limits
          const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE ratings >= ${ratings} ORDER BY ratings DESC, date_created DESC LIMIT ${initial_data}, ${limits}`
          mysql.execute(sql, [], (err, result, field) => {
            if (err == null) {
              const countRows = `SELECT COUNT(*) AS count_item FROM items WHERE ratings >= ${ratings}`
              mysql.execute(countRows, [], (error, results, fields) => {
                res.send({
                  success: true,
                  result: result,
                  page: page,
                  limit: limits,
                  total_data: results[0].count_item,
                  total_page: Math.ceil(results[0].count_item / limits)
                })
              })
            } else {
              console.log(err)

              res.send({
                success: false,
                msg: 'error'
              })
            }
          })
        }
      }
    } else if (ratings && sort) {
      if (sort == 'ASC') {
        const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE ratings >= ${ratings} ORDER BY ratings ASC`
        mysql.execute(sql, [], (err, result, field) => {
          if (err == null) {
            res.send({
              success: true,
              result: result
            })
          } else {
            res.send({
              success: false,
              msg: "error"
            })
          }
        })
      } else {
        const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE ratings >= ${ratings} ORDER BY ratings DESC`
        mysql.execute(sql, [], (err, result, field) => {
          if (err == null) {
            res.send({
              success: true,
              result: result
            })
          } else {
            res.send({
              success: false,
              msg: "error"
            })
          }
        })
      }
    } else {
      const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE ratings >= ${ratings} `
      mysql.execute(sql, [], (err, result, field) => {
        if (err == null) {
          res.send({
            success: true,
            result: result
          })
        } else {
          res.send({
            success: false,
            msg: "error"
          })
        }
      })
    }
  } else {
    mysql.execute(item.items, [], (err, result, field) => {
      if (err == null) {
        res.send({
          success: true,
          result: result
        })
      } else {
        res.send({
          success: false,
          msg: "error"
        })
      }
    })
  }
})

router.get('/:id_item', (req, res) => {
  const {
    id_item
  } = req.params
  mysql.execute(item.item_by_id, [id_item], (err, result, field) => {
    if (err == null) {
      const sql = `SELECT id_item, id_category, item_name, price, images, ratings FROM items WHERE id_category=${result[0].id_category} AND id_item!=${result[0].id_item} ORDER BY ratings DESC`
      mysql.execute(sql, [], (error, results, fields) => {
        if (error == null) {
          res.send({
            success: true,
            result: result,
            showcase: results
          })
        } else {
          res.send({
            success: false,
            msg: "error"
          })
        }
      })
    } else {
      res.send({
        success: false,
        msg: "error"
      })
    }
  })
})

router.post('/insert', uploadImageItem, karyawan, (req, res) => {
  const {
    id_category,
    item_name,
    price,
    description,
    ratings
  } = req.body
  const images = req.file.filename

  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(item.insert_item, [id_category, item_name, price, description, images, ratings, created_on, updated_on], (err, result, field) => {
    if (err == null) {
      res.send({
        success: true,
        result
      })
    } else {
      res.send({
        success: false,
        msg: err
      })
    }
  })
})

router.put('/update/:id_item', karyawan, (req, res) => {
  const {
    id_category,
    item_name,
    price,
    description,
    images,
    ratings
  } = req.body
  const {
    id_item
  } = req.params
  console.log(item_name)
  const updated_on = new Date()

  mysql.execute(item.update_item, [id_category, item_name, price, description, images, ratings, updated_on, id_item], (err, result, field) => {
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

router.delete('/delete/:id_item', (req, res) => {
  const {
    id_item
  } = req.params
  mysql.execute(item.delete_item, [id_item], (err, result, field) => {
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



module.exports = router