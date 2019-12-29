module.exports = {
  insert_booking: 'INSERT INTO booking (no_booking, date_booking, id_user, name,zipcode, payment_status, created_on) VALUES (?,?,?,?,?,?,?)',
  insert_booking_detail: 'INSERT INTO booking_detail (no_booking, id_item, item_name, item_price, amount) values (?,?,?,?,?,?)',
  booking_detail: 'SELECT no_booking, date_booking ,name, zip, total_payment, payment_status, id_item.booking_detail, item_name.booking_detail, images, item_price, amount FROM booking JOIN booking_detail JOIN items WHERE booking.no_booking = booking.booking_detail AND booking.id_item = items.id_item',
  delete_booking: 'DELETE FROM booking WHERE no_booking=?'
}