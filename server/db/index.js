var createTables = require('./config.js');
var mysql = require('mysql');
const Promise = require('bluebird');


// const connection = mysql.createConnection({
// 	user: 'root', 
// 	password: '', 
// 	database: 'berkScanner'
// })

function handleDisconnect() {
  connection = mysql.createConnection(connection); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  // connection.on('error', function(err) {
  //   console.log('db error', err);
  //   if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
  //     handleDisconnect();                         // lost due to either server restart, or a
  //   } else {                                      // connnection idle timeout (the wait_timeout
  //     throw err;                                  // server variable configures this)
  //   }
  // });
}

// handleDisconnect();


const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
});


connection.on('error', function(err) {
  console.log('db error', err);
  console.log('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ')
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    handleDisconnect();                         // lost due to either server restart, or a
  } else {                                      // connnection idle timeout (the wait_timeout
    throw err;                                  // server variable configures this)
  }
});

// const populateCourses = require('./seedCourses.js')

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`))
  .then(() => db.queryAsync(`USE ${process.env.database}`))
  .then(() => createTables(db))
  .catch(err => {
    console.log('error with connectin to mysql!!!! :', err)
    handleDisconnect();
  })	

module.exports = db;
//connect to mySql
  //