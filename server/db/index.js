var mysql = require('mysql');
const Promise = require('bluebird');

// var pool = mysql.createPool({
//     host     : 'localhost',
//     user     : 'user',
//     password : 'secret',
//     database : 'test',
//     port     : 3306
// });

let pool = mysql.createPool({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database,
  

})

module.exports = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1];
         //last arg is callback
        pool.getConnection(function(err, connection) {
          
        if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, [results]);
        });
      });
    },
    // queryAsync: function(){
    //     var sql_args = [];
    //     var args = [];
    //     for(var i=0; i<arguments.length; i++){
    //         args.push(arguments[i]);
    //     }
    //     var callback = args[args.length-1];
    //      //last arg is callback
    //     pool.getConnection(function(err, connection) {
    //     let queryAsync2 = Promise.promisify(connection.query);
  
    //     if(err) {
    //             console.log(err);
    //             return callback(err);
    //         }
    //         if(args.length > 2){
    //             sql_args = args[1];
    //         }
    //     connection.query(args[0], sql_args, function(err, results) {
    //       connection.release(); // always put connection back in pool after last query
    //       if(err){
    //                 console.log(err);
    //                 return callback(err);
    //             }
    //       callback(null, results);
    //     });
    //   });
    // }
};



// var createTables = require('./config.js');
// var mysql = require('mysql');
// const Promise = require('bluebird');

// let info = {
//   host     : process.env.host,
//   user     : process.env.user,
//   password : process.env.password,
//   database : process.env.database
// }

// function initializeConnection(config) {
//     function addDisconnectHandler(connection) {
//         connection.on("error", function (error) {
//             if (error instanceof Error) {
//                 if (error.code === "PROTOCOL_CONNECTION_LOST") {
//                     console.error(error.stack);
//                     console.log("Lost connection. Reconnecting...");

//                     initializeConnection(connection.config);
//                 } else if (error.fatal) {
//                     throw error;
//                 }
//             }
//         });
//     }

//     var connection = mysql.createConnection(config);
//     // Add handlers.
//     addDisconnectHandler(connection);
//     const db = Promise.promisifyAll(connection, { multiArgs: true });

//     connection.connectAsync();
//     module.exports = connection;
//     module.exports.bobby = Date.now();
//     console.log('module.exports :', module.exports)
//     return connection;
// }


// module.exports = initializeConnection(info);


// const connection = mysql.createConnection({
// 	user: 'root', 
// 	password: '', 
// 	database: 'berkScanner'
// })

// function handleDisconnect() {

//                                              // to avoid a hot loop, and to allow our node script to
//   connection = mysql.createConnection(info);

//   connection.on('error', function(err) {
//     console.log('db error', err);
//     console.log('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ')
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });

//   db.connectAsync()
//   .then(x => console.log('connected'))
//   .catch(e => {
//     console.log('error :', e);
//     throw e;
//   })// Recreate the connection, since
//                                                     // the old one cannot be reused                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   // connection.on('error', function(err) {
//   //   console.log('db error', err);
//   //   if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//   //     handleDisconnect();                         // lost due to either server restart, or a
//   //   } else {                                      // connnection idle timeout (the wait_timeout
//   //     throw err;                                  // server variable configures this)
//   //   }
//   // });
// }

// handleDisconnect();





// let connection = mysql.createConnection(info);


// connection.on('error', function(err) {
//   console.log('db error', err);
//   console.log('ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ')
//   if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//     handleDisconnect();                         // lost due to either server restart, or a
//   } else {                                      // connnection idle timeout (the wait_timeout
//     throw err;                                  // server variable configures this)
//   }
// });

// const populateCourses = require('./seedCourses.js')

// const db = Promise.promisifyAll(connection, { multiArgs: true });

// db.connectAsync()
//   .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`))
//   .then(() => db.queryAsync(`USE ${process.env.database}`))
//   .then(() => createTables(db))
//   .catch(err => {
//     console.log('error with connectin to mysql!!!! :', err)
//     handleDisconnect();
//   })	

// module.exports = db;

//connect to mySql
  //