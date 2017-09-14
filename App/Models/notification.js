let bookshelf = require('./connection');
let TimeFormat = require('../utils/time');
let moment = require('moment');
const UNREAD = 0;

var Notification = bookshelf.Model.extend({
  tableName: 'notifications',
}, {
  markAsRead(userId) {
    return Notification.query({
        where: {
          user_id: userId,
          is_read: UNREAD
        }
      }) // eslint-disable-line camelcase
      .save({
        user_id: userId, // eslint-disable-line camelcase
        is_read: 1 // eslint-disable-line camelcase
      }, {
        method: 'update'
      }).then((res) => {
        return res;
      });
  },
  saveNotify(data) {
    return new Notification(data).save().then(() => {
      return true;
    });
  },
  getNumberOfUnread(userId) {
    let startTime = moment(TimeFormat.timeCreated()).subtract(7, 'day').format('YYYY-MM-DD');
    let condition = `select count(notifications.id) as count from notifications where user_id = ${userId}
    and created_at >= '${startTime}' and exists (select * from notification_messages where notifications.message_id = notification_messages.id)
    and (is_read = ${UNREAD})
    or exists (select * from bookings where notifications.booking_id = bookings.id and bookings.deleted_at is null)
    and user_id = ${userId}
    and created_at >= '${startTime}'
    and (is_read = ${UNREAD})`;
    return bookshelf.knex.raw(condition).then(function (result) {
      let data = JSON.parse(JSON.stringify(result[0]));
      return data[0];
    });
  }
});
module.exports = Notification;
