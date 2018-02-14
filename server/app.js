const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models')
const utils = require('./lib/hash-utils.js')
const routes = require('./routes');
const auth = models.auth;
console.log('auth :', auth);
const app = express()
let db = require('./db/index.js');
// const cron = require('./cron.js')
const Promise = require('bluebird');
if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
}

passport.use(auth.local); 
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  models.users.get({id: id})
    .then(userInfo => {
    	cb(null, userInfo[0])
    })
});

// app.use(require('morgan')('combined'));//
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('cookie-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

// console.log('app :', app);

module.exports = app;