module.exports = {
  carts: 'SELECT * FROM carts',
  carts_by_id_user: 'SELECT * FROM carts WHERE id_user=?',
  insert_cart: 'INSERT INTO carts (id_item, id_user, item_name, price, number_of_item, created_on, updated_on) VALUES(?,?,?,?,?,?,?)',
  update_cart: 'UPDATE carts SET price=?, number_of_item=?, updated_on=? WHERE id_cart=?',
  delete_cart: 'DELETE FROM carts WHERE id_cart=?'
}