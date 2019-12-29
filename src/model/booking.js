module.exports = {
  booking: 'INSERT INTO booking ( user) SELECT o.userid , o.timestamp FROM users u INNER JOIN orders o ON  o.userid = u.id'
}