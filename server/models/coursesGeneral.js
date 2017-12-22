var Model = require('./model.js');
var db = require('../db/index.js')


class CoursesGeneral {

  constructor() {
  
  }

  getEmailsForCourse(courseId, table, join) {
    // if (isSection) {
    //   table = 'secondary_courses' 
    //   join = 'users_secondary_courses';
    // } else {
    //   table = 'courses';
    //   join = 'users_courses';
    // }
    let query = `select u.email, u.phone, u.preference from users u inner join ${join} j on u.id = j.user_id inner join ${table} t on j.class_id = t.id and t.id = ${courseId}`;
    // `select u.email from users u inner join users_courses j on u.id = j.user_id inner join secondary_courses  t on j.class_id = t.id and t.id = 218`
    return db.queryAsync(query).spread(emails => emails)
  }
}

module.exports = new CoursesGeneral();

// var x = module.exports.isAlreadyTrackingCourse(1, 1219)
// x.then(y => console.log('y :', y))
// table = 'secondary_courses' 
// let join = 'users_secondary_courses';
// module.exports.getEmailsForCourse(54, table, join )
// .then(x => {console.log('x :', x)})
// .catch(err => {console.log(err)});

// var x = new Users_Courses;
// module.exports.isAlreadyTrackingCourse(2, 11858)
//   .then(res => console.log('result :', res))
//   .catch(err => console.log(err));
// x.get({id:1})
// .then(x => console.log(x[0])