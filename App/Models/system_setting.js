var bookshelf = require('./connection');
const constConfig = require('../../config/config').const;
var SSetting = bookshelf.Model.extend({
  tableName: 'system_configuration'
}, {
  getTimeReminder() {
    return this.query({
      where: {
        key: constConfig.keyTimeReminder
      }
    }).fetch();
  },
  getTimeFeedback() {
    return this.query({
      where: {
        key: constConfig.keyTimeFeedBack
      }
    }).fetch();
  },
  getTimeLastVisit() {
    return this.query({
      where: {
        key: constConfig.keyTimeLastVisit
      }
    }).fetch();
  },
  getDayLastVisit() {
    return this.query({
      where: {
        key: constConfig.keyDayLastVisit
      }
    }).fetch();
  },
  getTimeNotifyManual() {
    return this.query({
      where: {
        key: constConfig.keyTimeNotifyManual
      }
    }).fetch();
  }
});
module.exports = SSetting;
