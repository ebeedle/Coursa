const { courses, users, users_courses, secondaryCourses, UsersSecondaryCourses } = require('./index.js')
//////////////////////////////////////////////////////////////////////////////////////////
//courses
function seedCoursesForTesting() {
  return new Promise (
    function(resolve, reject) {
      deleteSeedCoursesForTesting()
      .then(() => {
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
      })
    }
  )
}

function deleteSeedCoursesForTesting() {

  return new Promise (
    function(resolve, reject) {
      console.log('deleteing seeded data in db@!!!!!!!!!');
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
//////////////////////////////////////////////////////////////////////////////////////////
//secondaryCourses
function seedSections() {
  return new Promise (
    (res, rej) => {
      return secondaryCourses.create({
        id: 100000,
        parent_id: 100000,
        name: 'seed secondary course' 
      })
      .then(() => {
        UsersSecondaryCourses.create({
          id: 100000,
          user_id: 100000,
          class_id: 100000
        })
      })
      .then(() => {
        res(true);
      })
      .catch(e => {
        console.log('error :', e)
        rej(e)
      })
    }
  )
  //insert all discussion sections with parent id = 100000 in 
}

function deleteSeedSections() {
  return new Promise (
    function(resolve, reject) {
      return secondaryCourses.delete({id: 100000})
      .then(() => {
        return UsersSecondaryCourses.delete({id: 100000})
      })
      .then(() => resolve(true))
      .catch(e => reject(e))
    }
  )
}
//////////////////////////////////////////////////////////////////////////////////////////
//users
function deleteUser(email, phone) {
  return new Promise(
    (res, rej) => {
      return users.delete({email: 'testtest', phone:'9999999999'})
      .then(() => res(true))
      .catch(e => rej(e))
    }
  )
}


module.exports.seedCoursesForTesting = seedCoursesForTesting;
module.exports.deleteSeedCoursesForTesting = deleteSeedCoursesForTesting;
module.exports.seedSections = seedSections;
module.exports.deleteSeedSections = deleteSeedSections;
module.exports.deleteUser = deleteUser;


// module.exports.deleteSeedSections()
// module.exports.seedSections()
// module.exports.deleteSeedCoursesForTesting()
// .then(x => console.log('x :', x)) 
