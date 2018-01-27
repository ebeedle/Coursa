//set up cron job from npm
var request = require('request');
var CronJob = require('cron').CronJob;
var cheerio = require('cheerio');
var sendEmail = require('./email.js');
var db = require('./db/index.js');
const Promise = require('bluebird');
var mysql = require('mysql');
var models = require('./models');
const textUser = require('./sms.js');
let current = require('./models/courses.js').current;
// console.log('current :', current);

// db.queryAsync(`select * from courses where status = 'O' or status = 'C' or status = 'W'`)
//   .spread(courses => {
// 	  //call function with array
// })
// {
//   email: gmail.com,
//   oldStatus: 'c'
//   newStatus: 'w'	
// }
function classOpened(oldStatus, newStatus) {
	if (oldStatus === 'W' && newStatus === 'O') {
		return true;
	}
	if (oldStatus === 'C' && (newStatus === 'W' || newStatus === 'O')) {
		return true;
	}
	return false;
}

let textNumber = 0;
let maxNumber = 0;
let times = 0;
//get all classes
  //iterate through all classes 
    //make request to class api to see if class status has changed
    //update class status regardless if it has changed or not
    //use old and new status to see if class has opened up 
      //if it has, query for all user's emails that are tracking class
      //
  function getUpdatedStatus(courses, term, year, cb, start=0, chunk=10, currentCourse=0, emailList = []) {
    console.log('new itereation :', start)
    //start = 0, chunk = 100 courses.length = 20
      // start + chunck greater
        //start = 0;
        //chunck = 20 - 1 - 0; = 19
        //0, 19
    if (start > courses.length - 1) {
      // console.log('greater than couses.length')
      return cb(null, emailList);
    }
    if (start + chunk >= courses.length) {
      console.log('chunck too long ')
      chunk = courses.length - start - 1;
      console.log('chunk :', chunk, 'start :', start)
    }

    console.log('start :', start, 'end :', start + chunk);
  	// if (currentCourse >= courses.length) {
  		 
  	// }
    let count = 0;
    for (let k = start; k <= start + chunk; k++) {
      // console.log('iterating', k)
      //iterate from start to end chunck
        //get course
        //run through below
        //at end, incrment count
        //if count is equal to 20
          //set timeout and recurse again. 
      let course = courses[k]
      // console.log('course :', course);
      let isSection = !!course.parent_id;
    	let oldStatus = course.status;
    	let newStatus;
      let model;
      if (isSection) {
        model = 'secondaryCourses'
      } else {
        model = 'courses';
      }
      
  

      models[model].getStatus(course.number, term, year, course.id)
      .then(status => {
        newStatus = status;
        return models[model].update({id: course.id}, {status: status})
      })
      .then(() => {
      // console.log('old status :', oldStatus, 'new status :', newStatus, 'id :', course.id)
        if (classOpened(oldStatus, newStatus)) {
          console.log('opened !!!', course.id, 'type :', model);

          return models[model].getEmailsForCourse(course.id)
          // if (isSection) {
          //   query = `select u.email from users u inner join ${join} j on u.id = j.user_id inner join ${table} t on j.class_id = t.id and t.id = ${course.id}`;
          // }
          // var query = `select u.email from users u inner join users_courses uc on u.id = uc.user_id inner join courses c on uc.class_id = c.id and c.id = ${course.id}`
          // return db.queryAsync(query)
        } else {
          throw 'classClosed';
        }
      })
        .then(emails => {
    			  // emails = emails[0];
            // console.log('emails :', emails)
    				for (var i = 0; i < emails.length; i++) {
              let oldStatusLong;
              let newStatusLong;
    					oldStatus === 'C' ? oldStatusLong = 'closed' : oldStatusLong === 'W' ? oldStatusLong = 'waitlist' : oldStatusLong = 'open';
    					newStatus === 'C' ? newStatusLong = 'closed' : newStatusLong === 'W' ? newStatusLong = 'waitlist' : newStatusLong = 'open';
    					let info = {
    						email: emails[i].email,
    					  oldStatus: oldStatusLong,
    					  newStatus: newStatusLong,
    					  name: course.name,
    					  number: course.number,
                phoneNumber: emails[i].phone,
    					}
              //send email/text from here
              if (textNumber < maxNumber) {
                textNumber++;
                textUser(info);
              } else {
                console.log('want to text but cant')
              }
              // console.log('preference :', emails[i].preference, 'user :', info.email)
              // if (emails[i].preference === 'e') {
              //   console.log('only sending email')
              //   sendEmail(info);
              // } else if (emails[i].preference === 't' && textNumber < maxNumber) {
              //   console.log('texting user')
              //   textNumber++;
              //   // textUser(info);
              // } else if (emails[i].preference === 'b' && textNumber < maxNumber) {
              //   console.log('texting and emailing user')
              //   textNumber++;
              //   sendEmail(info);
              //   // textUser(info);
              // } else {
              //   console.log('problem!!!!!!', textNumber)
              // }
    					// emailList.push(info)
    				}
    				throw 'finished'
    		})
    		.catch(err => {
        times++;
        console.log(times)
          count++;
          // if (err === 'classClosed' || err === 'finished') {
            // console.log('class finihshed :', course.number)
            if (count > chunk) {
              console.log('count :', count)
              setTimeout(function() {
      		  		  getUpdatedStatus(courses, term, year, cb, start + chunk + 1, chunk, currentCourse+1, emailList)
              }, 5000)
            }
    			// }
    			// else {
       //      console.log('errorrrrrrr calling cb')
    			// 	return cb(err, null)
    			// }
    		})
      }
  }

  //depending on the course load, 

function checkForOpenings(term, year) {
  let courseList;
  let sectionList;
  return models.secondaryCourses.getTrackedSections(term, year)
  //get all that are tracked
  //filter those that are tracked to be in correct term and year
  .then(sections => {
    // console.log('sections :', sections)
    sectionList = sections;
    return models.courses.getTrackedCourses(term, year)
    //join users_courses with couses for year = year and term=term 

    //get all that are tracked
    //filter those that are tracked to be in correct term and year


    // console.log('sections :', sections);
    // courses = courses.concat(sections);
  	// return courses;
  })
  .then(courses => {
    // let combinedCourses = sectionList;
    let combinedCourses = models.courses.combineArrs(courses, sectionList)
    console.log('length :', combinedCourses.length);

    // courses.concat(sectionList);
    // console.log('combined courses:', combinedCourses)
    //call getUpdateStatus, which will iterate through in chunks
  	getUpdatedStatus(combinedCourses, term, year, (err, list) => {
  		if (err) {
  			throw err;
  		}
      console.log('done');
  		// for (var i = 0; i < list.length; i++) {
    //     // sendEmail(list[i]);
    //     textUser(list[i]);
  		// }
  		//iterate through list
  		//run emails, send. 
  	})
	  //call function with array
  })
  .catch(err => {
    console.log('err :', err)
  })
}




// checkForOpenings('spring', 2018);
// let info = {
//   email: 'bob@gmail.com',
//   number: 2344,
//   oldStatus: 'closed',
//   newStatus: 'open',
//   name: 'bio101'
// }

// textUser(info)
checkForOpenings('spring', 2018);
// let model = 'secondaryCourses';
// models[model].getEmailsForCourse(40)
// .then(x => console.log('emails :', x))


  	//make http request to course, get status
  	  //if status changed in good way
  	    //query db, find all users associated with that course
  	      //push users and change of course to emailList



// -every 15 mins
//   -query courses that are tracked 
//     -make http request to each of them
// 	  -if new status changes from closes-wait, wait-open, closed-open
// 	    -alert users of those courses of change
// 	    -change status to new status

// var getEmails = function() {

// // 	var ob = {};
// // 	var emails = [];

// // 	const connection2 = mysql.createConnection({
// // 		user: 'root', 
// // 		password: '', 
// // 		database: 'scanner'
// // 	})

// // 	const db2 = Promise.promisifyAll(connection2, { multiArgs: true });

// // 	db2.connectAsync()
// // 	  .then(() => {
// // 	  	return new Promise(
// // 	  		function(resolve, reject) {
// // 			  	request('http://www.sjsu.edu/openuniversity/docs/cies/2174_FALL_IES.htm', (err, res, body) => {
// // 				    var $ = cheerio.load(body);
// // 				    var rows = $('tr')
// // 				    for (var i = 2; i < rows.length; i++) {
// // 							if (rows.eq(i).children().length < 2) {
// // 								continue;
// // 							}
// // 							var courseNumber = rows.eq(i).children().eq(1).text()
// // 							var seats = rows.eq(i).children().eq(11).text()
// // 							if (seats > 0) {
// // 								ob[courseNumber] = true;
// // 							}
// // 				    }
// // 				    resolve('hi');
// // 				  })
// // 		    }
// // 		  )
// // 	  })
// // 	  .then(() => {
// // 		  return db2.queryAsync(`select u.email, uc.class_id from users_courses uc inner join users u where u.id = uc.user_id;`)
// // 		 })
// // 		 .then(info => {
// // 	    	var users = info[0];
// // 	    	for (var i = 0; i < users.length; i++) {
// // 	    		if (ob[users[i]['class_id']]) {
// // 	    			var email = users[i].email;
// // 	    			var courseNum = users[i]['class_id'];
// // 	    			emails.push([email, courseNum]);
// // 	    		}
// // 	    	}
// // 	    	return;    	
// // 		  })
// // 	  .then(() => {
// // 	  	console.log('emails!!!! ', emails)
// // 	  	for (var i = 0; i < emails.length; i++) {
// // 	  		sendEmail(emails[i]);
// // 	  	}
// // 	  })
// // 	  .catch(err => {console.log(err)})
// // }




// var job = new CronJob({
//   cronTime: '0 */01 * * * 0-6',
//   onTick: function() {
    
//     console.log('sending emails for openings'); 
//     checkForOpenings(current.term, current.year);
     
//   },
//   start: false,
//   timeZone: 'America/Los_Angeles'
// });





// job.start();