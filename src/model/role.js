module.exports = {
  roles: 'SELECT * FROM roles',
  insert_role: 'INSERT INTO roles (role_name, created_on, updated_on) VALUES(?,?,?)',
  update_role: 'UPDATE roles SET role_name=?, updated_on=? WHERE id_role=?',
  delete_role: 'DELETE FROM roles WHERE id_role=?',
}
