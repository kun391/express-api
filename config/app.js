'use strict'

import dotenv from 'dotenv'
dotenv.config()

// config databases
export const DB = {
  MYSQL: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 3306,
    USERNAME: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_DATABASE_NAME
  }
}

// config key encrypt
export const JWT = {
  key: '#@!#NuyeHei30P3uM'
}

// config key & secret of social networks
export const AUTH = {
  FB: {
    CLIENT_ID: process.env.FACEBOOK_APP_ID,
    CLIENT_SECRET: process.env.FACEBOOK_APP_SECRET,
    CLIENT_CALLBACK: process.env.FACEBOOK_APP_CALLBACK
  }
}

// config pem & key to push notification
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
