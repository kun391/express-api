var BaseFactory = require('./BaseFactory');
var Factory = require('rosie').Factory;
var faker = require('faker');
var factory = new Factory()
  .attrs({
    device_token: () => faker.random.uuid(),
    device_type: () => faker.random.arrayElement([1,5]),
  });

class DeviceFactory extends BaseFactory {
  constructor() {
    super();
    this._className = 'DeviceFactory';
    this._model = require('../../lib/models/device_token');
    this._ftr = factory;
  }
}
module.exports = DeviceFactory;
