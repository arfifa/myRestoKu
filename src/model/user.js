module.exports = {
  users: 'SELECT * FROM users',
  user_login: 'SELECT * FROM users WHERE username=?',
  insert_user: 'INSERT INTO users (fullname, date_birth, gender, no_telp, email, username, password, id_role, created_on, updated_on) VALUES(?,?,?,?,?,?,?,?,?,?)',
  update_user: 'UPDATE users SET name=?, id_card=?, address=?, no_phone=?, username=?, password=?, role_id=?, updated_on=? WHERE id_user=?',
  delete_user: 'DELETE FROM users WHERE id_user=?',
  user_by_id: 'SELECT * FROM users WHERE id_user=?',
  insert_token: 'INSERT INTO revoked_token (id_token, username ) VALUES(?,?)',
  get_token: 'SELECT * FROM revoked_token WHERE username=?',
  delete_token: 'DELETE FROM revoked_token WHERE username=?',
  update_token: 'UPDATE revoked_token SET id_token=? WHERE username=?',
  detail_user_by_id: 'SELECT * FROM detail_user WHERE id_user=?',
}
