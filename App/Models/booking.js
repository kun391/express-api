let bookshelf = require('./connection')
let Salon = require('./salon')
let TimeFormat = require('../utils/time')
let moment = require('moment')

var Booking = bookshelf.Model.extend({
  tableName: 'bookings',
  salon () {
    return this.belongsTo(Salon)
  }
}, {
  getUpComing () {
    let start = moment(TimeFormat.timeCreated()).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let end = moment(TimeFormat.timeCreated()).add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
    return this.query((qb) => {
      qb.where('time_start', '>=', start)
      qb.where('time_start', '<=', end)
      qb.whereRaw('deleted_at is null')
    }).fetchAll({withRelated: ['salon']})
  },
  getUpComingByUser (id) {
    let start = moment(TimeFormat.timeCreated()).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let end = moment(TimeFormat.timeCreated()).add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
    return this.query((qb) => {
      qb.where('customer_id', '=', id)
      qb.where('time_start', '>=', start)
      qb.where('time_start', '<=', end)
      qb.whereRaw('deleted_at is null')
    }).fetchAll()
  },
  getDetail (id) {
    return this.query((qb) => {
      qb.where('id', '=', id)
    }).fetch({withRelated: ['salon']})
  }
})
module.exports = Booking
