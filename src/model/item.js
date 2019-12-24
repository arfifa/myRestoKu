module.exports = {
  items: 'SELECT * FROM items',
  insert_item: 'INSERT INTO items (id_category, item_name, price, description, images, ratings, date_created, date_updated) VALUES(?,?,?,?,?,?,?,?)',
  update_item: 'UPDATE items SET id_category=?, item_name=?, price=?, description=?, images=?, ratings=?, date_updated=? WHERE id_item=?',
  delete_item: 'DELETE FROM items WHERE id_item=?'
}


