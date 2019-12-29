require('dotenv').config()
const router = require('express').Router()

const mysql = require('../dbconfig')
const reviews = require('../model/review')
const { auth } = require('../middleware')

router.get('/:id_item', (req, res) => {
  const { id_item } = req.params
  mysql.execute(reviews.reviews_by_id_item, [id_item], (err, result, field) => {
    if (err == null) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 404,
        msg: 'Request not found'
      })
    }
  })
})

router.post('/insert', auth, (req, res) => {
  const { id_item, id_user, name, review, rating } = req.body
  console.log(id_user);

  const created_on = new Date()
  const updated_on = new Date()
  mysql.execute(reviews.insert_review, [id_item, id_user, name, review, rating, created_on, updated_on], (err, result, field) => {
    if (err == null) {
      mysql.execute(reviews.average_rating, [id_item], (err, result, field) => {
        if (err == null) {
          const ratings = result[0].averageRating.toFixed(2)
          mysql.execute(reviews.update_ratings, [ratings, id_item], (err, result, field) => {
            if (err == null) {
              res.send({
                status: 200,
                msg: 'rating berhasil ditambahkan!'
              })
            } else {
              res.send({
                status: 404,
                msg: 'Request not found'
              })
            }
          })
        } else {
          res.send({
            status: 404,
            msg: 'Request not found'
          })
        }
      })
    } else {
      res.send({
        status: 404,
        msg: 'Request not found'
      })
    }
  })
})

router.delete('/delete/:id_review/:id_item', auth, (req, res) => {
  const { id_review, id_item } = req.params
  mysql.execute(reviews.delete_review, [id_review], (err, result, field) => {
    if (err == null) {
      mysql.execute(reviews.average_rating, [id_item], (err, result, field) => {
        if (err == null) {
          if (result[0].averageRating != null) {
            console.log(result[0].averageRating);
            const ratings = result[0].averageRating.toFixed(2)
            mysql.execute(reviews.update_ratings, [ratings, id_item], (err, result, field) => {
              if (err == null) {
                res.send({
                  status: 200,
                  msg: 'review berhasil dihapus!'
                })
              } else {
                res.send({
                  status: 404,
                  msg: 'Request not found'
                })
              }
            })
          } else {
            const ratings = 0
            console.log(id_item);
            mysql.execute(reviews.update_ratings, [ratings, id_item], (err, result, field) => {
              if (err == null) {
                res.send({
                  status: 200,
                  msg: 'review tidak ditemukan!'
                })
              } else {
                res.send({
                  status: 404,
                  msg: 'Request not found'
                })
              }
            })
          }
        } else {
          res.send({
            status: 404,
            msg: 'Request not found'
          })
        }
      })
    } else {
      res.send({
        status: 404,
        msg: 'Request not found'
      })
    }
  })
})

module.exports = router