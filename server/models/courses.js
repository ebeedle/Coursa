var Model = require('./model.js');
var request = require('request');
var db = require('../db/index.js')
const sc = require('./secondary_courses.js');
let CoursesGeneral = require('./coursesGeneral.js');


class Courses extends Model {
	constructor() {
		super('Courses')
    this.termInfo = {
      2017: {
        winter: {
          termNumber: '3A618',
          nodeNumber: 2178
        }
      },
      2018: {
        spring: {
          termNumber: '3A770',
          nodeNumber: 2182
        }
      }
    }
    this.current = {
      year: 2018,
      term: 'spring'
    }
	}
	isValidCourse(number) {
		return this.get({number: number})
		  .then(courses => {
        if (courses.length) {
        	return true;
        } else {
        	return false;
        }
		  })
		  .catch(err => {
        console.log('error :', err)
		  })
	}

  delay() {
    return new Promise (
      function(resolve, reject) {
        setTimeout(function() {
          reject(true);
        }, 300000)
      }
    )
  }

  makeRequestForJSON(courseNumber, term, year) {
    term = term.toLowerCase();
    let nodeNumber = this.termInfo[year][term].nodeNumber;
    return new Promise (
      function(resolve, reject) {
        var url = `http://classes.berkeley.edu/enrollment/update/${nodeNumber}/${courseNumber}`;
        request(url, (err, response, body) => {
          if (err) {
            console.log("error !!!!!")
            return reject(err)
          } else if (response.headers['content-type'] !== 'application/json') {
            return reject('not json');
          } else {
            return resolve(body);
          }
        })
      }
    )
  }
  getStatus(courseNumber, term, year) {
    return new Promise(
      function(resolve, reject) {
        this.makeRequestForJSON(courseNumber, term, year)
        .then(body => {
          resolve(JSON.parse(body).classSections[0].enrollmentStatus.status.code)
        })
        .catch(err => {
          console.log('delaying')
          return this.delay()
        })
        .catch(x => {
          console.log('making request again')
          this.makeRequestForJSON(courseNumber, term, year)
          .then(body => {
            console.log('json on second request attempt')
            resolve(JSON.parse(body).classSections[0].enrollmentStatus.status.code)
          })
          .catch(err => {
            console.log('final error after delay, json probably not there')
            reject(err);
          })
        })
      }.bind(this)
      )
  }
  combineArrs(sections, lectures) {
    let combined = [];
    //while sections
    //for every two lectures, add a section;
    while (lectures.length || sections.length) {
      if (lectures.length) {
        combined.push(lectures.pop());
      }
      if (lectures.length) {
        combined.push(lectures.pop());
      }

      if (sections.length) {
        combined.push(sections.pop());
      }
    }

    return combined;
}

  getAllCourseCodes() {
    let query = `select distinct code from courses order by code`;
    return db.queryAsync(query).spread(data => data)
  }
  getCoursesByCode(code) {
    let query = `select id, name from courses where code = '${code}' order by name`;
    return db.queryAsync(query).spread(data => data); 
  }
  getTrackedCourses(term, year) {
    let activeCourseQuery = `select c.* from courses c inner join (select Max(id), Max(user_id), class_id as max_class_id from users_courses group by class_id) y where y.max_class_id = c.id and c.term = '${term}' and c.year = ${year};`
    return db.queryAsync(activeCourseQuery).spread(courses => courses)
  }

  getEmailsForCourse(courseId) {    
      let table = 'courses';
      let join = 'users_courses';
      return CoursesGeneral.getEmailsForCourse(courseId, table, join)
  }
}

module.exports = new Courses();

// module.exports.getStatus(20522, 'spring', 2018)
// .then(x => console.log('x :', x))
// .catch(e => console.log('error :', e))

// module.exports.delay() 
// .then(x => {
//   console.log('x :', x)
//   return module.exports.delay();
// })
// .then(p => console.log('p :', p))
// .catch(e => console.log('error :', e))
// module.exports.getStatus(21912, 'spring', 2018)
// .then(x => console.log('x :', x))
// .catch(err => console.log('err :', err))
// module.exports.getEmailsForCourse(52)
// .then(x => console.log('x :', x))
// module.exports.getStatus(20244, 'spring', 2018)
// .then(x => console.log('x :', x))
// console.log('this.get :', module.exports.get)


// console.log('models :', models)
// sc.get({id: 3927})
// module.exports.getStatus(15176, 'spring', 2018)
// .then(x => {
//   console.log('x :', x)
// })
// var x = module.exports.getStatus(13464, 'winter', 2017)
// x
// .then(y => console.log('y :', y));
// module.exports.getCoursesByCode('CHEM')
// .then(x => console.log(x))

