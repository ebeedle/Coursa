const {courses, users, users_courses} = require('./index.js')

console.log('testing from test.js')
function seedCoursesForTesting() {
  return new Promise (
    function(resolve, reject) {
      return courses.create({id: 100000, code: 'ABCD', name: 'test', term: 'spring', year: '2018', number: 100000 })
        .then(() => {
          return users.create({id: 100000, email: 'testuserBerkScanner@gmail.com'})
        })
        .then(user => {
          let userId = user.insertId;
          return users_courses.create({id: 100000, user_id: 100000, class_id: 100000})
        })
        .then(() => {
          resolve(true);
        })
        .catch(e => reject(e))
    }
  )
}

function deleteSeedCoursesForTesting() {
  return new Promise (
    function(resolve, reject) {
      return courses.delete({id: 100000})
      .then(() => {
        return users.delete({id: 100000})
      })
      .then(() => {
        return users_courses.delete({id: 100000})
      })
      .then(() => resolve(true))
      .catch(e => reject(e))
    }
  )
}

module.exports.seedCoursesForTesting = seedCoursesForTesting;
module.exports.deleteSeedCoursesForTesting = deleteSeedCoursesForTesting;

// module.exports.deleteSeedCoursesForTesting()
// .then(x => console.log('x :', x)) 
