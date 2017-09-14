let bookshelf = require('./connection');
let Booking = require('./booking');
var SSetting = require('./system_setting');
let TimeFormat = require('../utils/time');
let moment = require('moment');

var Ticket = bookshelf.Model.extend({
  tableName: 'tickets',
  booking() {
    return this.belongsTo(Booking);
  }
}, {
  getTickets() {
    let start = moment(TimeFormat.timeCreated()).subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    let end = moment(TimeFormat.timeCreated()).subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
    return this.query((qb) => {
      qb.where('created_at', '>=', start);
      qb.where('created_at', '<=', end);
    }).fetchAll({
      withRelated: ['booking']
    });
  },
  getUserLongTimeNoMeet() {
    return SSetting.getDayLastVisit().then((object) => {
      const time = JSON.parse(object.attributes.value);

      const toDay = TimeFormat.timeCreated();
      const lastVisitDay = moment(toDay).subtract(parseInt(time), 'day').format('YYYY-MM-DD');
      const startOfLastVisitDay = moment(lastVisitDay).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      const endOfLastVisitDay = moment(lastVisitDay).endOf('day').format('YYYY-MM-DD HH:mm:ss');
      const condition = `select id from users where id in(select customer_id from tickets where created_at > "${startOfLastVisitDay}" AND created_at < "${endOfLastVisitDay}")
                         and id not in(select customer_id from bookings where created_at > "${lastVisitDay}" AND created_at < "${toDay}")`;

      return bookshelf.knex.raw(condition).then((result) => {
        return result;
      });
    });
  }
});
module.exports = Ticket;
