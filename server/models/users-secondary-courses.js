var Model = require('./model.js');
var db = require('../db/index.js')


class UsersSecondaryCourses extends Model {
  constructor() {
    super('users_secondary_courses')
  }
  isAlreadyTrackingCourse(userID, courseId) {
    var query = `select uc.id from users_secondary_courses uc inner join secondary_courses sc where sc.id = uc.class_id and uc.user_id = ${userID} and sc.id = ${courseId}`;
    return db.queryAsync(query).spread(data => data);
  }
  getCoursesTracked(userID, courseData) {
    var query = `select sc.id, sc.name, sc.number from users_secondary_courses usc inner join secondary_courses sc where sc.id = usc.class_id and usc.user_id = ${userID}`
    return db.queryAsync(query).spread(data => {
      for (let i = 0; i < data.length; i++) {
        let section = data[i];
        section.section = true;
      }
      return data.concat(courseData)
    })
  }
}

module.exports = new UsersSecondaryCourses();

// module.exports.getNumberOfRecordsByUser(1)
// .then(x => console.log('x :', x))

// module.exports.getCoursesTracked(1)
// .then(x => console.log('x :', x))

// var x = module.exports.isAlreadyTrackingCourse(1, 1219)
// x.then(y => console.log('y :', y))
// module.exports.getCoursesTracked(7)
// .then(x => {console.log('x :', x)})
// .catch(err => {console.log(err)});

// var x = new Users_Courses;
// module.exports.isAlreadyTrackingCourse(2, 11858)
//   .then(res => console.log('result :', res))
//   .catch(err => console.log(err));
// x.get({id:1})
// .then(x => console.log(x[0])