var mysql = require('mysql');
var request = require('request');
var expect = require('chai').expect;
var app = require('../server/app.js');
// var db = require('../server/db/index.js');
var Promise = require('bluebird');
var port = 4000;

    var clearDB = (tableNames, db, callback) => {
    	for (var i = 0; i < tableNames.length; i++) {
        var query = `truncate table ${tableNames[i]}`;
        db.query(query, (err, data) => {
        	if (err) {
        		return callback(err, null)
        	}
        	callback(null, data);
        })
    	}
    }


describe('', () => {
  var db;
  var server;
	beforeEach(done => {
		var tableNames = ['users'];

		db = mysql.createConnection({
			user: 'root', 
			password: '', 
			database: 'scanner'
		})
  
    db.connect(err => {
      if (err) {
      	return done(err);
      }
      else {
      	clearDB(tableNames, db, (err, data) => {
      		if (err) {
      			throw err;
      		}
	      	server = app.listen(port, () => {
	      		console.log(`listening on port ${port}`)
	      		done()
	      	})
      	})
      }
    });
  });

  afterEach(() => {
  	console.log('closing server');
  	server.close()
  });

  describe('can access users table', () => {
  	it('can connect to db', done => {
  		db.query('select * from users', (err, results) => {
  			if (err) {
  				return done(err);
  			} else {
  				expect(results).to.be.a('array');
  				done();
  			}
  		})
  	})
  	it('only allows a user to sign up once', done => {
  		var options = {
  			'method': 'POST',
  			'uri': `http://127.0.0.1:${port}/signup`,
  			'json': {
  				'username': 'jacksparrow',
  				'password': 'password3'
  			}
  		}

  		request(options, (err, res, body) => {
  			if (err) {
  				return done(err);
  			}
  			request(options, (err, res, body) => {
  				if (err) {
  					return done(err);
  				}
  				db.query(`select * from users where username = '${options.json.username}'`, (err, data) => {
  					if (err) {
  						done(err);
  					}
  					expect(data).to.have.lengthOf(1)
  					done();
  				})
  			})
  		})
  	})
  	it('does not store the user\'s original password', done => {
  		var options = {
  			'method': 'POST',
  			'uri': `http://localhost:${port}/signup`,
  			'json': {
  				'username': 'be',
  				'password': 'password'
  			}
  		}

  		request(options, (err, res, body) => {
  		  if (err) {
  		  	return done(err);
  		  }
  		  var query = `select * from users where username = 'be'`
  		  db.query(query, (err, data) => {
  		  	console.log('data :', data[0].password);
  		  	expect(data[0].password).to.not.equal('password');
  		  	done()
  		  })
  		})
  		//make post request to signUp
  		//then chekc the database to make sure orig password doesnt match stored
  	})
  })
})





// const populateCourses = require('./seedCourses.js')


// db.query(`select * from users`, (err, data) => {
// 	console.log('data :', data);
// })
  // .then(x => {
  // 	console.log('data :', x)
  // })
  // .catch(err => console.log(err))
