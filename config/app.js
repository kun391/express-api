'use strict'

import dotenv from 'dotenv'
dotenv.config()

export const DB = {
  MYSQL: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_DATABASE_NAME
  }
}

export const NOTIFICATION = {
  apn: {
    key: `${__dirname}/${process.env.FILE_NAME_KEY_PEM}`,
    cert: `${__dirname}/${process.env.FILE_NAME_CERT_PEM}`, // eslint-disable-line
    passphrase: process.env.PASSPHRASE
  },
  gcm: {
    apiKey: process.env.GCM_KEY
  },
  deviceIos: 1,
  deviceAndroid: 5
}
