var Factory = require('rosie').Factory

class BaseFactory {
  constructor () {
    this._className = 'BaseFactory'
    this._model = ''
    this._ftr = {}
  }

  set factory (ftr) {
    this._ftr = ftr
  }

  get factory () {
    return this._ftr
  }

  build (attrs, cb) {
    let attrsDefault = this.factory.build(attrs)
    return cb(attrsDefault)
  }
  create (attrs, cb) {
    let attrsDefault = this.factory.build(attrs)
    new this._model(attrsDefault).save().then(function (model) {
      return cb(model)
    })
  }
}
module.exports = BaseFactory
