require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const user = require('./src/routes/user');
const role = require('./src/routes/role');
const item = require('./src/routes/item');
const restaurant = require('./src/routes/restaurant');
const category = require('./src/routes/category');
const cart = require('./src/routes/cart');
const { auth, admin, karyawan } = require('./src/middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', user)
app.use('/role', auth, admin, role)
app.use('/item', auth, karyawan, item)
app.use('/restaurant', auth, restaurant)
app.use('/category', auth, category)
app.use('/cart', auth, cart)

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log('App Listen on 8080')
})
