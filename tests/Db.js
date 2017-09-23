'use strict'

// import knex from 'knex'

const DB = require('knex')({
  client: 'mysql',
  connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE_NAME,
  },
  pool: { min: 2, max: 7 }
});

console.log(Db);

module.exports = DB