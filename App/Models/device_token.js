var bookshelf = require('./connection');
var constConfig = require('../../config/config').const;
const ON = 1;
var DeviceToken = bookshelf.Model.extend({
  tableName: 'device_tokens'
}, {
  getDevicesAvailable(type = 'other') {
    return this.query((q) => {
      q.innerJoin('users', 'users.id', 'device_tokens.user_id');
      q.innerJoin('notification_settings', 'users.id', 'notification_settings.customer_id');
      if (type === constConfig.typeOther) {
        q.where('notification_settings.other', '=', ON);
      } else {
        q.where('notification_settings.reminder', '=', ON);
      }
    }).fetchAll().then((devices) => {
      return devices.toArray();
    });
  },
  getDevices() {
    return this.fetchAll().then((devices) => devices.toArray());
  },
  getDevicesOfUser(userId, type = 'other') {
    return this.query((q) => {
      q.innerJoin('users', 'users.id', 'device_tokens.user_id')
        .innerJoin('notification_settings', 'users.id', 'notification_settings.customer_id');
        if (type === constConfig.typeOther) {
          q.where('notification_settings.other', '=', ON);
        } else {
          q.where('notification_settings.reminder', '=', ON);
        }
        q.where('device_tokens.user_id', '=', userId);
    }).fetchAll().then((users) => {
      return users.toArray();
    });
  },
  getDevicesByUsers(list, type = 'other') {
    return this.query((q) => {
      q.innerJoin('users', 'users.id', 'device_tokens.user_id')
        .innerJoin('notification_settings', 'users.id', 'notification_settings.customer_id')
        .where('users.id', 'in', list);
        if (type === constConfig.typeOther) {
          q.where('notification_settings.other', '=', ON);
        } else {
          q.where('notification_settings.reminder', '=', ON);
        }
    }).fetchAll().then((devices) => {
      return devices.toArray();
    });
  }
});
module.exports = DeviceToken;
