module.exports = {
  carts: 'SELECT * FROM carts',
  carts_by_id_user: 'SELECT id_cart, carts.id_item, id_user, carts.item_name, carts.price, number_of_item,images FROM carts JOIN items WHERE items.id_item = carts.id_item AND id_user=?',
  insert_cart: 'INSERT INTO carts (id_item, id_user, item_name, price, number_of_item, created_on, updated_on) VALUES(?,?,?,?,?,?,?)',
  update_cart: 'UPDATE carts SET number_of_item=?, updated_on=? WHERE id_cart=?',
  delete_cart: 'DELETE FROM carts WHERE id_cart=?'
}