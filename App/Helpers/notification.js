var apn = require('apn')
var async = require('async')
var config = require('../../config/config').notification
var configConst = require('../../config/config').const
var deviceToken = require('../models/device_token')
var gcm = require('node-gcm')
var Notification = require('../models/notification')
let TimeFormat = require('../utils/time')

var pushAPN = function pushAPN (device, params) {
  var apnConnection = new apn.Connection(config.apn)
  console.log(apnConnection)
  var note = new apn.Notification()
  note.expiry = Math.floor(Date.now() / 1000) + 3600 // Expires 1 hour from now.
  note.badge = params.badge
  note.sound = 'ping.aiff'
  params.data.notifyCreatedAt = TimeFormat.parseISO8601(new Date())
  note.alert = params.title // title must be a string
  note.payload = params.data // data must be a object
  console.log(device)
  apnConnection.pushNotification(note, device)
}

var pushGCM = function pushGCM (devices, params) {
  var message = new gcm.Message()
  params.data.badge = params.badge
  params.data.notifyCreatedAt = TimeFormat.parseISO8601(new Date())
  message.addData(params.data) // data must be a object
  // Set  up the sender with you API key
  var sender = new gcm.Sender(config.gcm.apiKey)
  // Now the sender can be used to send messages
  sender.send(message, {
    registrationIds: [devices]
  }, (err, result) => {
    if (err) {
      console.error(err)
    } else {
      console.log(result)
    }
  })
}

var newNotify = function newNotify (userId, params) {
  if (params.data.type_notify !== 'feedback' && params.data.type_notify !== 'lastvisit') {
    let dataSave = {}
    dataSave.user_id = userId
    if (params.data.type_notify === 'general') {
      dataSave.message_id = params.data.id
    } else {
      if (params.data.type_notify === 'edit') {
        dataSave.status = configConst.typeEditBooking
      } else if (params.data.type_notify === 'confirm') {
        dataSave.status = configConst.typeConfirmBooking
      } else {
        dataSave.status = configConst.typeReminderBooking
      }
      dataSave.booking_id = params.data.id
    }
    dataSave.created_at = TimeFormat.timeCreated()
    dataSave.updated_at = TimeFormat.timeCreated()
    Notification.saveNotify(dataSave)
  }
}

class PushNotification {
  pushOne (userId, params, typeNotify = 'other') {
    deviceToken.getDevicesOfUser(userId, typeNotify).then((devices) => {
      if (devices.length > 0) {
        async.waterfall([
          function (callback) {
            newNotify(userId, params)
            callback()
          },
          function (callback) {
            Notification.getNumberOfUnread(userId).then(result => {
              params.badge = parseInt(result.count)
              devices.forEach((device) => {
                device = device.toJSON()
                if (device.device_type === config.deviceIos) {
                  pushAPN(device.device_token, params)
                } else {
                  pushGCM(device.device_token, params)
                }
              })
            })
            callback()
          }
        ])
      }
      return this
    }).catch((err) => {
      throw err
    })
  }
  pushList (list, params, typeNotify = 'other') {
    deviceToken.getDevicesByUsers(list, typeNotify).then((devices) => {
      if (devices.length > 0) {
        let receiver = []
        devices.forEach((device) => {
          device = device.toJSON()
          async.waterfall([
            function (callback) {
              if (receiver.indexOf(device.user_id) < 0) {
                newNotify(device.user_id, params)
                receiver.push(device.user_id)
              }
              callback()
            },
            function (callback) {
              Notification.getNumberOfUnread(device.user_id).then(result => {
                console.log(result)
                params.badge = parseInt(result.count)
                if (device.device_type === config.deviceIos) {
                  pushAPN(device.device_token, params)
                } else {
                  pushGCM(device.device_token, params)
                }
              })
              callback()
            }
          ])
        })
      }
      return this
    }).catch((err) => {
      throw err
    })
  }
  pushAll (params, typeNotify = 'other') {
    deviceToken.getDevicesAvailable(typeNotify).then((devices) => {
      if (devices.length > 0) {
        let receiver = []
        devices.forEach((device) => {
          device = device.toJSON()
          async.waterfall([
            function (callback) {
              if (receiver.indexOf(device.user_id) < 0) {
                newNotify(device.user_id, params)
                receiver.push(device.user_id)
              }
              callback()
            },
            function (callback) {
              Notification.getNumberOfUnread(device.user_id).then(result => {
                console.log(result)
                params.badge = parseInt(result.count)
                if (device.device_type === config.deviceIos) {
                  pushAPN(device.device_token, params)
                } else {
                  pushGCM(device.device_token, params)
                }
              })
              callback()
            }
          ])
        })
      }
      return this
    }).catch((err) => {
      throw err
    })
  }
}
module.exports = PushNotification
