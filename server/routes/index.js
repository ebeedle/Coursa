const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const models = require('../models')
const ctrls = require('../controllers');


let routesUsingHomePage = ['/', '/login', '/signup', '/home']
router.get(routesUsingHomePage, ctrls.getHomePage)
router.post('/login', ctrls.logIn);
router.post('/signup', ctrls.signUp)
router.get('/trackedCourses', ctrls.getTrackedCoursesForUser)


router.post('/courseTrack', (req, res) => {
  var number = +req.body.number;
  console.log('number :', number);
  models.courses.isValidCourse(number)
    .then(hasCourse => {
      console.log('hascourse :', hasCourse)
      //do something
    })
    .catch(err => {
      console.log('error :', err)
      //do something else;
    })
})

router.get('/logout',
  function(req, res){
    req.logout();
    console.log('req.user', req.user)
    console.log('req.session', req.session);
    res.redirect('/');
  }
);



router.get('/classes',
 require('connect-ensure-login').ensureLoggedIn(),
 (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
})

router.get('/allCourses', (req, res) => {
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
})

router.get('/coursesByCode', (req, res) => {
  console.log('body :', req.body);
  console.log('query :', req.query);
  let code = req.query.code;
  models.courses.getCoursesByCode(code)
  .then(courses => res.send(courses))
  .catch(err => console.log(err))
})

// router.get('/sectionsByCourse', (req, res) => {
//   console.log('req query :', req.query);
//   let courseId = req.query.id;
//   models.secondaryCourses.getSections(courseId)
//   .then(sections => res.send(sections))
//   .catch(err => console.log(err))
// })

router.get('/courseCodes', (req, res) => {

  models.courses.getAllCourseCodes()
  .then(codesArr => {
    let codes = codesArr.map(codeInfo => {
      return codeInfo.code;
    })
    res.send(codes)
  })
  .catch(err => console.log(err))
})
router.get('/scan.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/scan.js'))
})

// router.get('/styles.css', (req, res) => {
//  res.sendFile(path.join(__dirname, '../../public/styles.css'))
// })

router.get('/portal.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/portal.js'))
})

router.post('/untrack', (req, res) => {
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
})

router.post('/trackSection', (req, res) => {
  console.log("ATTEMPTING TO TRACKING SECTION !!!!!")
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
})
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

router.post('/trackCourse', (req, res) => {
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
})

//given and id in body, /submit should track course
console.log('d :', path.join(__dirname, '/images'))
router.use('/images', express.static(path.join(__dirname, '/images')))

// router.get('/bundle.js', (req, res) => {
//  res.sendFile(path.join(__dirname, '../../public/bundle.js'))
// })

router.get('/sections', (req, res) => {
  return models.secondaryCourses.getSectionsForCourse(req.query.id)
  .then(sections => {
    res.send(sections);
  })
  .catch(err => console.log(err))
})

router.get('/logged-in', (req, res) => {
  console.log('req.user :', req.user)
  if (req.user) {
    res.send('true')
  } else {
    res.send('false')
  }
})

module.exports = router;