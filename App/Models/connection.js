var config = require('../../config/config').db;
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.MySQL.HOST,
    port: config.MySQL.PORT,
    user: config.MySQL.USERNAME,
    password: config.MySQL.PASSWORD,
    database: config.MySQL.DB,
    charset: 'utf8',
    timezone: 'America/Los_Angeles'
  }
});
var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
