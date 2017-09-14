var bookshelf = require('./connection');
var today = (new Date()).toISOString().split('T')[0];
var User = bookshelf.Model.extend({
  tableName: 'users'
}, {
  getUsersToDay() {
    return this.query({
      where: {
        birthday: today
      }
    }).fetchAll().then((users) => {
      if (users !== null) {
        return users.toArray();
      }
      return [];
    });
  }
});
module.exports = User;
