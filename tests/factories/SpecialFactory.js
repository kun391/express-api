var BaseFactory = require('./BaseFactory');
var Factory = require('rosie').Factory;
var faker = require('faker');
var factory = new Factory()
  .attrs({
    day: () => (new Date(faker.date.recent())).getDay(),
    month: () => faker.random.arrayElement([0,1,2,3,4,5,6,7,8,9,10,11]),
    message: () => faker.random.words()
  });

class SpecialFactory extends BaseFactory {
  constructor() {
    super();
    this._className = 'SpecialFactory';
    this._model = require('../../lib/models/special_day');
    this._ftr = factory;
  }
}
module.exports = SpecialFactory;
