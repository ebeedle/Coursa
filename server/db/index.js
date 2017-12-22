var createTables = require('./config.js');
var mysql = require('mysql');
const Promise = require('bluebird');
const database = 'berkScanner';


const connection = mysql.createConnection({
	user: 'root', 
	password: '', 
	database: 'berkScanner'
})

// const populateCourses = require('./seedCourses.js')

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db))
  .catch(err => console.log(err))	

module.exports = db;
//connect to mySql
  //