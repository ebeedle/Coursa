const Strategy = require('passport-local').Strategy;
const models = require('./');
const utils = require('../lib/hash-utils')

module.exports.local = new Strategy(
  (username, password, cb) => {
    console.log('srategy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    models.users.get({email: username})
    .then(users => {
      if (!users.length) {
        return cb(null, false)
      }
      var user = users[0];
      if (!utils.compareHash(password, user.password, user.salt)) {
        console.log('wrong password')
        return cb(null, false);
      }
      console.log('right password');
      return cb(null, {id: user.id})
    })
    .catch(err => {
      return cb(err);
    })
  }
)

