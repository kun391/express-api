const config = {}

export config.db = {
  MySQL: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE_NAME
  }
}

export config.notification = {
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
