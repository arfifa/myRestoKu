module.exports = {
  items: 'SELECT id_item, id_category, item_name, price, images, ratings FROM items LIMIT 8',
  item_by_id: 'SELECT * FROM items WHERE id_item=?',
  insert_item: 'INSERT INTO items (id_category, item_name, price, description, images, ratings, date_created, date_updated) VALUES(?,?,?,?,?,?,?,?)',
  update_item: 'UPDATE items SET id_category=?, item_name=?, price=?, description=?, images=?, ratings=?, date_updated=? WHERE id_item=?',
  delete_item: 'DELETE FROM items WHERE id_item=?',
  item_orderBy_name_asc: 'SELECT * FROM items ORDER BY item_name ASC',
  item_orderBy_name_desc: 'SELECT * FROM items ORDER BY item_name DESC',
  item_orderBy_ratings_asc: 'SELECT * FROM items ORDER BY ratings ASC',
  item_orderBy_ratings_desc: 'SELECT * FROM items ORDER BY ratings DESC',
  item_orderBy_price_asc: 'SELECT * FROM items ORDER BY price ASC',
  item_orderBy_price_desc: 'SELECT * FROM items ORDER BY price DESC',
  item_orderBy_date_updated_asc: 'SELECT * FROM items ORDER BY date_updated ASC',
  item_orderBy_date_updated_desc: 'SELECT * FROM items ORDER BY date_updated DESC',
}


