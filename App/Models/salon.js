var bookshelf = require('./connection');
var Salon = bookshelf.Model.extend({
  tableName: 'salons'
});
module.exports = Salon;
