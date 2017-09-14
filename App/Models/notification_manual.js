let bookshelf = require('./connection');
const UNREAD = 0;
var NotificationManual = bookshelf.Model.extend({
  tableName: 'notification_messages'
}, {
  getNotifications() {
    return this.query({where: {status: UNREAD}}).fetchAll();
  },
  setSend(id) {
    NotificationManual.forge({
      id
    }).save({
      status: 1
    }, {
      patch: true
    }).then((model) => {
      return model;
    });
  }
});
module.exports = NotificationManual;
