var createTables = require('./config.js');
var mysql = require('mysql');
const Promise = require('bluebird');


// const connection = mysql.createConnection({
// 	user: 'root', 
// 	password: '', 
// 	database: 'berkScanner'
// })

const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
});

// const populateCourses = require('./seedCourses.js')

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`))
  .then(() => db.queryAsync(`USE ${process.env.database}`))
  .then(() => createTables(db))
  .catch(err => console.log(err))	

module.exports = db;
//connect to mySql
  //