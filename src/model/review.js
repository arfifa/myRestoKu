module.exports = {
  reviews_by_id_item: 'SELECT * FROM review WHERE id_item=?',
  insert_review: 'INSERT INTO review (id_item, id_user, name, review, rating, created_on, updated_on) VALUES(?,?,?,?,?,?,?)',
  delete_review: 'DELETE FROM review WHERE id_review=?',
  review_by_id: 'SELECT * FROM review WHERE id_review=?',
  average_rating: 'SELECT AVG(rating) AS averageRating FROM review WHERE id_item=?',
  update_ratings: 'UPDATE items SET ratings=? WHERE id_item=?',
}
