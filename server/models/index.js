module.exports.users = require('./users.js');
module.exports.courses = require('./courses.js');
module.exports.secondaryCourses = require('./secondary-courses.js');
module.exports.users_courses = require('./users-courses.js');
module.exports.UsersSecondaryCourses = require('./users-secondary-courses.js');
module.exports.CoursesGeneral = require('./courses-general.js');
module.exports.testFunctions = require('./test-functions.js');
module.exports.auth = require('./auth.js');



// x = module.exports.secondaryCourses.getSectionsForCourse(14301)
// .then(x => console.log('x :', x))
// // module.exports.courses.create({
// //   name: 'sdlkfjldskfj',
// // })

// module.exports.courses.delete({name: 'sdlkfjldskfj'})
// .then(x => console.log(x))