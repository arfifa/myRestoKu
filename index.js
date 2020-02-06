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
const review = require('./src/routes/review');
const { auth, admin, karyawan } = require('./src/middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static('public/imagesItem'))

app.use(cors())

app.use('/user', user)
app.use('/role', auth, admin, role)
app.use('/item', item)
app.use('/restaurant', restaurant)
app.use('/category', auth, karyawan, category)
app.use('/cart', auth, cart)
app.use('/review', review)

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`server run on port ${port}`)
})
