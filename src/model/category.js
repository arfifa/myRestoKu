module.exports = {
  categories: 'SELECT * FROM categories',
  insert_category: 'INSERT INTO categories (category_name, created_on, updated_on) VALUES(?,?,?)',
  update_category: 'UPDATE categories SET category_name=?, updated_on=?  WHERE id_category=?',
  delete_category: 'DELETE FROM categories WHERE id_category=?'
}