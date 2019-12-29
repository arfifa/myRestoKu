<h1 align="center">ExpressJS - Simple Restaurant RESTfull API</h1>



Note App is a simple note application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.v12.10.0-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name note, and Import file [note.sql](note.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/notes)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
APP_PORT=3000
APP_URI=http://localhost:3000/
DB_SERVER=localhost//default
DB_USER=root//default
DB_PASSWORD=
DB_DATABASE=restoku
```

## End Point
**1. GET**<br>
*a. item*
* `/item`
* `/item?item_name=jeruk`(search by item_name)
* `/item?item_name=nasi&sort=ASC`(search by item_name order by item_name and date_created ASC)
* `/item?item_name=nasi&sort=DESC`(search by item_name order by item_name and date_created DESC)
* `/item?item_name=nasi&sort=DESC&limits=1&page=2`(search by item_name order by item_name and date_created DESC with pagination)
* `/item?lowers_price=5000&highest_price=70000`(search by price)
* `/item?lowers_price=5000&highest_price=70000&sort=ASC`(search by price order by price and date_created ASC)
* `/item?lowers_price=5000&highest_price=70000&sort=DESC`(search by price order by price and date_created DESC)
* `/item?lowers_price=5000&highest_price=70000&sort=DESC&limits=1&page=2`(search by price order by price and date_created DESC with pagination)
* `/item?ratings=5`(search by ratings)
* `/item/item_by_id/:id_item` (Get item by id with showcase by highest rating)

*b. cart*
* `/cart`(get all cart)
* `/cart/user/:id_user`(get cart by id_user)
* `/item?item_name=nasi&sort=ASC`(search by item_name order by item_name and date_created ASC)
* `/item?item_name=nasi&sort=DESC`(search by item_name order by item_name and date_created DESC)
* `/item?item_name=nasi&sort=DESC&limits=1&page=2`(search by item_name order by item_name and date_created DESC with pagination)
* `/item?lowers_price=5000&highest_price=70000`(search by price)
* `/item?lowers_price=5000&highest_price=70000&sort=ASC`(search by price order by price and date_created ASC)
* `/item?lowers_price=5000&highest_price=70000&sort=DESC`(search by price order by price and date_created DESC)
* `/item?lowers_price=5000&highest_price=70000&sort=DESC&limits=1&page=2`(search by price order by price and date_created DESC with pagination)
* `/item?ratings=5`(search by ratings)
* `/item/item_by_id/:id_item` (Get item by id with showcase by highest rating)

* `/item/insert` (insert item)
* `/item/update/:id_item`(update item)
* `/item/delete/:id_item`(delete item)



* `/categories?search=Diary`
* `/category/:id` (Get category by id)


**2. POST**
* `/note`
    * ``` { "title": "Party", "note": "Herman's Party at 19.00", "category": 1 } ```

* `/category`
    * ``` { "categoryName": "Category6" } ```

**3. PATCH**
* `/note/:id` (Update note by id)
   * ``` { "title": "Party", "note": "Herman's Party at 18.00", "category": 2 } ```
* `/category/:id` (Update category by id)
   * ``` { "categoryName": "Category8" } ```

**4. DELETE**
* `/note/:id` (Delete note by id)
* `/category/:id` (Delete category by id)
