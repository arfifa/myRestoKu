module.exports = {
  restaurants: 'SELECT * FROM restaurants',
  insert_restaurant: 'INSERT INTO restaurants (id_admin, name, logo, longitude, latitude, description, created_on, updated_on) VALUES(?,?,?,?,?,?,?)',
  update_restaurant: 'UPDATE restaurants SET name=?, logo=?, longitude=?, latitude=?, description=?, updated_on=? WHERE id_restaurants=?',
  delete_restaurant: 'DELETE FROM restaurants WHERE id_restaurant=?',
  restaurant_by_id: 'SELECT * FROM restaurants WHERE id_restaurant=?',
}
