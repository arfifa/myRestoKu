module.exports = {
  users: 'SELECT * FROM users',
  insert_user: 'INSERT INTO users (name, id_card, address, no_phone, username, password, role_id, created_on, updated_on) VALUES(?,?,?,?,?,?,?,?,?)',
  update_user: 'UPDATE users SET name=?, id_card=?, address=?, no_phone=?, username=?, password=?, role_id=?, updated_on=? WHERE id_user=?',
  delete_user: 'DELETE FROM users WHERE id_user=?',
  user_by_id: 'SELECT * FROM users WHERE id_user=?',
}
