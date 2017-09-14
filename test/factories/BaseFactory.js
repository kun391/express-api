var Factory = require('rosie').Factory;

class BaseFactory {
  constructor() {
    this._className = 'BaseFactory';
    this._model = '';
    this._ftr = {};
  }

  set factory(ftr) {
    this._ftr = ftr;
  }

  get factory() {
    return this._ftr;
  }

  build(attrs, cal) {
    let attrsDefault = this.factory.build(attrs);
    return cal(attrsDefault);
  }
  create(attrs, cal) {
    let attrsDefault = this.factory.build(attrs);
    new this._model(attrsDefault).save().then(function(model) {
      return cal(model);
    });
  }
}
module.exports = BaseFactory;
