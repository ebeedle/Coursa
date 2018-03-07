var Model = require('./model.js');
var db = require('../db/index.js')
const Promise = require('bluebird');
if (!db.queryAsync) {
      db = Promise.promisifyAll(db);
}

class Users_Courses extends Model {
	constructor() {
		super('users_courses')
	}
	isAlreadyTrackingCourse(userID, courseId) {
		var query = `select uc.id from users_courses uc inner join courses c where c.id = uc.class_id and uc.user_id = ${userID} and c.id = ${courseId}`;
	  return db.queryAsync(query).spread(data => data);
	}
	getCoursesTracked(userID) {
		var query = `select c.id, c.name, c.number from users_courses uc inner join courses c where c.id = uc.class_id and uc.user_id = ${userID}`
		return db.queryAsync(query).spread(data => data)
	}
}

module.exports = new Users_Courses();
// module.exports.isAlreadyTrackingCourse(100021, 8521)
// .then(x => console.log('x :', x))
// var x = module.exports.isAlreadyTrackingCourse(1, 1219)
// x.then(y => console.log('y :', y))
// module.exports.getNumberOfRecordsByUser(1)
// .then(x => {console.log('y :', x)})
// .catch(err => {console.log(err)});

// var x = new Users_Courses;
// module.exports.isAlreadyTrackingCourse(2, 11858)
//   .then(res => console.log('result :', res))
//   .catch(err => console.log(err));
// x.get({id:1})
// .then(x => console.log(x[0])