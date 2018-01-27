// var db = require('../db/index.js');
// const Promise = require('bluebird');
// var utils = require('../lib/hash-utils.js')

// if (!db.queryAsync) {
//   db = Promise.promisifyAll(db);
// }
// module.exports.findUserByUsername = function(email, callback) {
//   var query = `select * from users where email = '${email}'`
//   db.queryAsync(query)
//     .then(userInfo => {
//       callback(null, userInfo[0][0])
//     })

//     .catch(err => {
//       callback(err, null)
//     })
// }

// module.exports.findUserById = function(id, callback) {
//   var query = `select * from users where id = ${id}`
//   db.queryAsync(query)
//     .then(userInfo => {
//       callback(null, userInfo[0][0])
//     })

//     .catch(err => {
//       callback(err, null)
//     })
// }

// var handleSignup = (email, password, callback) => {
//   var query = `select * from users where email = '${email}'`;
//   db.queryAsync(query)
//     .then(data => {
//       if (data[0].length) {
//         throw data;
//       }
//       return data;
//     })
//     .then(() => {
//       var salt = utils.createSalt();
//       var hashedPassword = utils.createHash(password, salt);
//       var query = `insert into users (email, password, salt) values ('${email}', '${hashedPassword}', '${salt}')`;
//       return db.queryAsync(query)
//     })
//     .then(data => {callback(null, data)})
//     .catch(err => {
//       callback(err, null)})
// }
// module.exports.handleSignup = Promise.promisify(handleSignup);

// module.exports.getCurrentClasses = (user_id) => {
//   return new Promise(
//     (resolve, reject) => {
//       var query = `select c.name, uc.class_id from users_courses uc inner join courses c where c.number = uc.class_id and uc.user_id = ${user_id}`;
//       db.queryAsync(query)
//         .then(classes => resolve(classes[0]))
//         .catch(err => reject(err))
//     }
//   )
// }

// module.exports.removeClass = (id, number) => {
//   return new Promise(
//     function(resolve, reject) {
//       var query = `delete from users_courses where user_id = ${id} and class_id = ${number}`
//       db.queryAsync(query)
//         .then(() => resolve())
//         .catch(err => reject(err))
//     }
//   )
// }


// module.exports.isValidCourse = (number) => {
//   return new Promise(
//     function(res, rej) {
//       db.queryAsync(`select * from courses where number = ${number}`)
//         .then(results => {
//           console.log('results :', results[0]);
//           if (results[0].length) {
//             console.log('resutls[0]', results[0]);
//             res(results[0])
//           } else {
//             throw(false)
//           }
//         })
//         .catch(err => {
//           rej(err)
//         })
//     }
//   )
// }

// module.exports.isFirstUserTracking = (number) => {
//   return new Promise(
//     function(res, rej) {
//       db.queryAsync(`select * from courses where number = ${number}`)
//         .then(results => {
//           console.log('results :', results[0]);
//           if (results[0].length) {
//             res(true)
//           } else {
//             throw(false)
//           }
//         })
//         .catch(err => {
//           rej(err)
//         })
//     }
//   )
// }