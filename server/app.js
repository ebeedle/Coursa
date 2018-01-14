var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const path = require('path');
var models = require('./models/index.js')
var utils = require('./lib/hashUtils.js')
var models2 = require('./models/index2.js');

const app = express()
// require('dotenv').load();
var db = require('./db/index.js');
// var cron = require('./cron.js')
const Promise = require('bluebird');
if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
}


  passport.use(new Strategy(
	  function(username, password, cb) {
      models2.users.get({email: username})
      .then(users => {
      	if (!users.length) {
      		return cb(null, false)
      	}
      	var user = users[0];
        if (!utils.compareHash(password, user.password, user.salt)) {
		      return cb(null, false);
		    }
		    return cb(null, {id: user.id})
      })
      .catch(err => {
      	return cb(err);
      })
	  }
  ));

  
	passport.serializeUser(function(user, cb) {
	  console.log('SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING SERIALISING')
	  cb(null, user.id);
	});

	passport.deserializeUser(function(id, cb) {
  console.log(`DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING DESERIALIZING`);
  //get user info by id and then call it back as second argument

  models2.users.get({id: id})
    .then(userInfo => {
    	cb(null, userInfo[0])
    })
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('cookie-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.

app.use(passport.initialize());

app.use(passport.session());



app.post('/courseTrack', (req, res) => {
	var number = +req.body.number;
	console.log('number :', number);
  models2.courses.isValidCourse(number)
    .then(hasCourse => {
    	console.log('hascourse :', hasCourse)
    	//do something
    })
    .catch(err => {
    	console.log('error :', err)
    	//do something else;
    })


	// models.isValidCourse(number)
	//   .then(val =>  {
	//   	console.log('val :', val);
	//     res.send(JSON.stringify(val[0]));
	//   })
	//   .catch(val => {
	//   	res.send(val)
	//   })
	//query database to see if course is valid
	//
})


app.get ('/trackedCourses', (req, res) => {
	return models2.users_courses.getCoursesTracked(req.user.id)
  .then(data => {
    console.log('data :', data)
    return models2.UsersSecondaryCourses.getCoursesTracked(req.user.id, data)
  })
	.then(data => {
		res.send(JSON.stringify(data));
	})
	.catch(err => {
		console.log('error :', err)
		res.end()
	})
	
})
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/landing.html'))
})

app.get('/signup', function (req, res) {	
  res.sendFile(path.join(__dirname, '../client/signup.html'))
})

app.post('/signup', (req, res) => {
	return models2.users.handleSignup(req.body.username, req.body.password, req.body.number)
	  .then(() => {
      console.log('REDIRECTINGNGKDLGSDKGLKSDGJLDSKJGLDSKJGLDSKJGLKSDJGDSKJGLDKSJGLSKDJGLKDGJLGDSJJDSKLDSGJSKLD')
	  	res.redirect('/login')
	  })
	  .catch(err => {
	  	console.log('error :', err)
	  	res.redirect('/signup')
	  })
})

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/login.html'))
})

app.post('/login',
 passport.authenticate('local', { failureRedirect: '/login' }),
 (req, res) => {
	console.log('requser', req.user);
	res.redirect('/home');
})

app.get('/logout',
  function(req, res){
    req.logout();
    console.log('req.user', req.user)
    console.log('req.session', req.session);
    res.redirect('/');
  });

app.get('/home',
require('connect-ensure-login').ensureLoggedIn(),
(req, res) => {
	res.sendFile(path.join(__dirname, '../public/home.html'))
})

app.get('/classes',
 require('connect-ensure-login').ensureLoggedIn(),
 (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.get('/allCourses', (req, res) => {
  let courseGraph = {};
  models2.courses.getAll()
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

app.get('/coursesByCode', (req, res) => {
  console.log('body :', req.body);
  console.log('query :', req.query);
  let code = req.query.code;
  models2.courses.getCoursesByCode(code)
  .then(courses => res.send(courses))
  .catch(err => console.log(err))
})

// app.get('/sectionsByCourse', (req, res) => {
//   console.log('req query :', req.query);
//   let courseId = req.query.id;
//   models2.secondaryCourses.getSections(courseId)
//   .then(sections => res.send(sections))
//   .catch(err => console.log(err))
// })

app.get('/courseCodes', (req, res) => {

  models2.courses.getAllCourseCodes()
  .then(codesArr => {
    let codes = codesArr.map(codeInfo => {
      return codeInfo.code;
    })
    res.send(codes)
  })
  .catch(err => console.log(err))
})
app.get('/scan.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/scan.js'))
})

app.get('/styles.css', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/styles.css'))
})

app.get('/portal.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/portal.js'))
})

app.post('/untrack', (req, res) => {
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
	models2[model].delete({user_id: id, class_id: courseID})
	  .then(() => {
	  	console.log('wernt thorugh')
	  	res.send(`class ${courseID} removed`)
	  })
	  .catch(err => res.send(`error : ${err}`))
})

app.post('/trackSection', (req, res) => {
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

        return models2[model].get({id: courseInfo.courseId})
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
          return models2[joinModel].isAlreadyTrackingCourse(userId, courseInfo.courseId)
       })
      .then(data => {

        //make sure user is not already tracking course
        if (data.length) {
          throw 'tracking';
        }
        
        return models2.users_courses.getNumberOfRecordsByUser(userId)
        //see if user has more than 10 courses tracked
          //if so, throw error 'more Than 10'
      })
      .then(numberLectures => {
        numberOfLecturesTracked = numberLectures;
        return models2.UsersSecondaryCourses.getNumberOfRecordsByUser(userId)
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
        return models2[joinModel].create({user_id: userId, class_id: courseInfo.courseId})

      })
      .catch(err => {
        courseInfo.status = err;
        throw err
      })
}

app.post('/trackCourse', (req, res) => {
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

app.get('/bundle.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/bundle.js'))
})

app.get('/sections', (req, res) => {
  return models2.secondaryCourses.getSectionsForCourse(req.query.id)
  .then(sections => {
    res.send(sections);
  })
  .catch(err => console.log(err))
})

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })


module.exports = app;