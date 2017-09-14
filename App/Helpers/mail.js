let config = require('../../config/config')
let request = require('request')

let sent = function sent (url, data) {
  let domain = config.const.boDomain
  request({
    method: 'POST',
    uri: `${domain}${url}`,
    form: data
  }, function (error, response) {
    if (response.statusCode == 200) {
      console.log('Email has been sent.')
    } else {
      console.log('error: ' + error)
    }
  })
}

exports = module.exports = {
  sent
}
