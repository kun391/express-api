var BaseFactory = require('./BaseFactory');
var Factory = require('rosie').Factory;
var faker = require('faker');
var factory = new Factory()
  .attrs({
    phone: () => faker.phone.phoneNumber(),
    guid: () => faker.random.uuid(),
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
    birthday: () => faker.date.past(),
    first_name: () => faker.name.firstName(),
    last_name: () => faker.name.lastName(),
    name: () => faker.name.findName(),
    avatar: () => faker.image.avatar(),
    avatar_fb: () => faker.image.avatar(),
    fb_info: () => faker.random.words(),
    address: () => faker.address.streetAddress(),
  });

class UserFactory extends BaseFactory {
  constructor() {
    super();
    this._className = 'UserFactory';
    this._model = require('../../lib/models/user');
    this._ftr = factory;
  }
}
module.exports = UserFactory;
