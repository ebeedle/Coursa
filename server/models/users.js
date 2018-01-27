var Model = require('./model.js');
var utils = require('../lib/hash-utils.js');

class Users extends Model {
	constructor() {
		super('users')
	}
	handleSignup(email, password, phone) {
		return this.get({email: email})
		  .tap(users => {
		  	if (users.length) {
		  		throw 'user already signed up';
		  	}
		  })
		  .then(users => {
        if (phone.length === 11 && phone[0] === '1') {
        	phone = phone.slice(1);
        }
		  	if (phone.length !== 10) {
		  		throw 'phone number wrong length';
		  	}
			  var salt = utils.createSalt();
	    	var hashedPassword = utils.createHash(password, salt);
	    	var info = {
	    		email: email,
	    		password: hashedPassword,
	    		salt: salt,
	    		phone: phone
	    	}
	    	return this.create(info)
		  })
		  .catch(err => {
		  	throw err;
		  })
	}
}

module.exports = new Users();

// module.exports.handleSignup('jakdsfddffsdf@gmail.com', 'password')
// 	.then(x => console.log('x :', x))
// 	.catch(e => console.log('e :', e))

// module.exports.handleSignup('p', 'p')
// 	.then(x => console.log('x :', x))
