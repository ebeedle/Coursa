const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models')
const utils = require('./lib/hash-utils.js')
const routes = require('./routes');
const app = express()
let db = require('./db/index.js');
// const cron = require('./cron.js')
const Promise = require('bluebird');
if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
}


  passport.use(new Strategy(
	  function(username, password, cb) {
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
  ));

  
	passport.serializeUser(function(user, cb) {
	  console.log('serialize')
	  cb(null, user.id);
	});

	passport.deserializeUser(function(id, cb) {
    console.log('desearlize')
  //get user info by id and then call it back as second argument

  models.users.get({id: id})
    .then(userInfo => {
      // console.log('\n\n\n userinfo :', userInfo[0])
    	cb(null, userInfo[0])
    })
});

// app.use(require('morgan')('combined'));

app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('cookie-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());

app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);


module.exports = app;