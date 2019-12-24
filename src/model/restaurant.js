module.exports = {
  restaurants: 'SELECT * FROM restaurants',
  insert_restaurant: 'INSERT INTO restaurants (name, logo, location, description, created_on, updated_on) VALUES(?,?,?,?,?,?)',
  update_restaurant: 'UPDATE restaurants SET name=?, logo=?, location=?, description=?, updated_on=? WHERE id_restaurants=?',
  delete_restaurant: 'DELETE FROM restaurants WHERE id_restaurants=?',
  restaurant_by_id: 'SELECT * FROM restaurants WHERE id_restaurants=?',
}