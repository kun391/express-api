var bookshelf = require('./connection');
var Setting = bookshelf.Model.extend({
  tableName: 'notification_settings'
});
module.exports = Setting;
