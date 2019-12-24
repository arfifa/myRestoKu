require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const user = require('./src/routes/user');
const item = require('./src/routes/item');
const restaurant = require('./src/routes/restaurant')
const { auth } = require('./src/middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', user)
app.use('/item', auth, item)
app.use('/restaurant', restaurant)

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log('App Listen on 8080')
})
