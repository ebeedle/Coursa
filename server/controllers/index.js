const path = require('path');
const models = require('../models');
const passport = require('passport');

module.exports.getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/home.html'))
}

module.exports.logIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('user :', user)
    if (err) { return next(err); }
    if (!user) { return res.status(500).json({ error: 'User not found.' }); }
    req.logIn(user, (err)   => {
        if (err) {
            return res.status(500).json({
                err: 'Could not log in user'
            });
        }
        res.status(200).json({
            status: 'Login successful!'
        });
    });
  })(req, res, next);
}

module.exports.getTrackedCoursesForUser = (req, res) => {
  return models.users_courses.getCoursesTracked(req.user.id)
  .then(data => {
    
    return models.UsersSecondaryCourses.getCoursesTracked(req.user.id, data)
  })
  .then(data => {
    res.send(JSON.stringify(data));
  })
  .catch(err => {
    console.log('error :', err)
    res.end()
  })
}

module.exports.signUp = (req, res) => {
  return models.users.handleSignup(req.body.username, req.body.password, req.body.number)
    .then(() => {
      res.status(200).json({
                status: 'Login successful!'
      });
    })
    .catch(err => {
      return res.status(500).json({
                err: 'Could not sign user up'
      });
    })
}

module.exports.logOut = (req, res) => {
    req.logout();
    console.log('req.user', req.user)
    console.log('req.session', req.session);
    res.redirect('/');
}

module.exports.getCoursesByCode = (req, res) => {
  let code = req.query.code;
  models.courses.getCoursesByCode(code)
  .then(courses => res.send(courses))
  .catch(err => console.log(err))
}

module.exports.getAllCourses = (req, res) => {
  console.log('getting all courses!!!!!!!!!')
  let courseGraph = {};
  models.courses.getAll()
      .then(courses => {
        for (let i = 0; i < courses.length; i++) {
          let course = courses[i];
          if (courseGraph[course.code] === undefined) {
            courseGraph[course.code] = [];
          }
          courseGraph[course.code].push(course)
        }

        let codes = Object.keys(courseGraph);
        for (let j = 0; j < codes.length; j++) {
          let code = codes[j];
          courseGraph[code] = courseGraph[code].sort((a, b) => {
            let aName = a.name;
            let bName = b.name;
            return aName.localeCompare(bName);
          })
        }
        res.send(JSON.stringify(courseGraph));
      })
      .catch(err => {
        console.log('error in /allcourses')
        res.send('error')
      })
}

module.exports.getAllCourseCodes = (req, res) => {

  models.courses.getAllCourseCodes()
  .then(codesArr => {
    let codes = codesArr.map(codeInfo => {
      return codeInfo.code;
    })
    res.send(codes)
  })
  .catch(err => console.log(err))
}


module.exports.getSections = (req, res) => {
  return models.secondaryCourses.getSectionsForCourse(req.query.id)
  .then(sections => {
    res.send(sections);
  })
  .catch(err => console.log(err))
}

module.exports.untrack = (req, res) => {
  let model;
  let isSection = req.body.isSection;
  if (isSection === 'false') {
    model = 'users_courses';
  } else {
    model = 'UsersSecondaryCourses';
  }

  console.log('req.body :', req.body);
  var courseID = req.body.courseID;
  var id = req.user.id;
  console.log("courseid", courseID, "id", id)
  console.log('deleting user id:', id, 'clas_id :', courseID, 'model :', model);
  models[model].delete({user_id: id, class_id: courseID})
    .then(() => {
      console.log('wernt thorugh')
      res.send(`class ${courseID} removed`)
    })
    .catch(err => res.send(`error : ${err}`))
}

function trackCourseOrSection(userId, courseInfo, model, joinModel) {

    var classStatus;
    let numberOfLecturesTracked;
    let numberOfDiscussionsTracked;

        return models[model].get({id: courseInfo.courseId})
      .then(result => {
        //make sure course exists
        if (!result.length || !result[0] || !result[0].name) {
          courseInfo.status = 'invalid';
          throw 'invalid';
        } else {
          courseInfo.courseName = result[0].name;
          courseInfo.courseNumber = result[0].number;
          classStatus = result[0].status
          console.log("class Stataus :", classStatus)
          return result;
        }
      })
      .then(() => {
          return models[joinModel].isAlreadyTrackingCourse(userId, courseInfo.courseId)
       })
      .then(data => {

        //make sure user is not already tracking course
        if (data.length) {
          throw 'tracking';
        }
        
        return models.users_courses.getNumberOfRecordsByUser(userId)
        //see if user has more than 10 courses tracked
          //if so, throw error 'more Than 10'
      })
      .then(numberLectures => {
        numberOfLecturesTracked = numberLectures;
        return models.UsersSecondaryCourses.getNumberOfRecordsByUser(userId)
      })

      .then(numberDiscussions => {
        let numberOfCoursesTracked = numberDiscussions + numberOfLecturesTracked;
        console.log('number tracking :', numberOfCoursesTracked);
        if (numberOfCoursesTracked >= 10) {
          throw 'tracking too many courses';
        } else {
          return true;
        }
      })
      .catch(err => {
        if (err === 'tracking') {
          courseInfo.status = 'tracking'
        }
        console.log('error not tracking :', err)
        throw err;
      })
      .then(x => {
        //insert into users_courses
        console.log('inserting into users_secondarycourses!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        return models[joinModel].create({user_id: userId, class_id: courseInfo.courseId})

      })
      .catch(err => {
        courseInfo.status = err;
        throw err
      })
}

module.exports.trackSection = (req, res) => {
  let userId = req.user.id
  var courseInfo = {
    status: true,
    courseName: null,
    courseNumber: null,
    courseId: req.body.id,
    section: null
  }
  return trackCourseOrSection(userId, courseInfo, 'secondaryCourses', 'UsersSecondaryCourses')
  .then(() => {
    res.send(JSON.stringify(courseInfo))
  })
  .catch(() => {
    console.log('error at final catch');
    res.send(JSON.stringify(courseInfo));
  })
}

module.exports.trackCourse = (req, res) => {
  let userId = req.user.id
    var courseInfo = {
      status: true,
      courseName: null,
      courseNumber: null,
      courseId: req.body.id
    }
    return trackCourseOrSection(userId, courseInfo, 'courses', 'users_courses')
    .then(() => {
      res.send(JSON.stringify(courseInfo))
    })
    .catch(() => {
      console.log('error at final catch');
      res.send(JSON.stringify(courseInfo));
    })
}


// module.exports.isLoggedIn = (req, res) => {
//   console.log("IS LOGGED IN ?????????????????????????????????")
//   console.log('req.user :', req.user)
//   if (req.user) {
//     res.send('true')
//   } else {
//     res.send('false')
//   }
// }


