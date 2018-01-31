var Model = require('./model.js');
const Models = require('./index.js')
var db = require('../db/index.js')

const CoursesGeneral = require('./courses-general.js');
var request = require('request');
var numb = 0;
class SecondaryCourses extends Model {
  constructor() {
    super('secondary_courses')
  }
  getSections(id) {
    return this.get({parent_id: id}, ["name", "id"])
  }

  getSectionsForCourse(id) {
    let query = `select sc.* from secondary_courses sc inner join courses c where c.id = sc.parent_id and c.id = ${id}`
    return db.queryAsync(query).spread(data => {
     if (data.length) {
      return data;
     } else {
      let query = `select * from courses where id = ${id}`;
      return db.queryAsync(query).spread(data => {
        data[0].isNotSection = true;
        return data;
      })
     }
    });
  }

  getTrackedSections(term, year) {
    console.log('calling tacked sections')
    //need to include year and term in query after adding fields
    let query =  `select p.* from courses c inner join (select sc.* from secondary_courses sc inner join (select Max(id), Max(user_id), class_id as max_class_id from users_secondary_courses group by class_id) y where y.max_class_id = sc.id) p where p.parent_id = c.id and c.term = '${term}' and c.year = ${year};`
    return db.queryAsync(query).spread(courses => courses)
  } 


  getEmailsForCourse(courseId) {
      let table = 'secondary_courses' 
      let join = 'users_secondary_courses';
      return CoursesGeneral.getEmailsForCourse(courseId, table, join)
  }

  getStatus(num, term, year, id) {
    return new Promise(
      function(resolve, reject) {
        let nodeNumber = Models.courses.termInfo[year][term].nodeNumber;
        let query = `select c.number, sc.number as secNumber from courses c inner join secondary_courses sc where sc.parent_id = c.id && sc.id = ${id}`
        let secNumber;
        return db.queryAsync(query).spread(data => {
          // console.log('data :', data)
          let parentNumber = data[0].number;
          secNumber = data[0].secNumber;
          // console.log('parent number :', parentNumber)
          // console.log('node number :', nodeNumber)
          return parentNumber;
        })
        .catch(err => {
          console.log('errin db query :', err)
          throw err;
        })
        .then(parentNumber => {
          // parentNumber = 21907;
          let url = `http://classes.berkeley.edu/json-all-sections/${parentNumber}/${parentNumber}/${nodeNumber}`;
          // 'http://classes.berkeley.edu/json-all-sections/21913/21913/2182'
          request(url, (err, response, body) => {
            if (err) {
              console.log('error, cant fetch discussion section')
              return reject(err)
            }
            let data = JSON.parse(body);
            let nodes = data.nodes;
            if (nodes.length) {
              for (let i = 0; i < nodes.length; i++) {
                let nodeData = JSON.parse(nodes[i].node.json)
                let sectionId = nodeData.id;
                if (+sectionId === +secNumber) {
                  // num++;
                  // console.log('numb :', numb)
                  let status = nodeData.enrollmentStatus.status.code;
                  return resolve(status)
                }
                
              }
            }
              console.log('CANT FIND THE NODE IN SECTIONS!!!!!!!!!', secNumber)
              Models.courses.getStatus(secNumber, term, year)
              .then(status => resolve(status))
              .catch(x => reject(x))
          })
        })
      }
    )
  }
}

// function combineArrs(sections, lectures) {
//   let combined = [];
//   //while sections
//   //for every two lectures, add a section;
//   while (lectures.length || sections.length) {
//     if (lectures.length) {
//       combined.push(lectures.pop());
//     }
//     if (lectures.length) {
//       combined.push(lectures.pop());
//     }

//     if (sections.length) {
//       combined.push(sections.pop());
//     }
//   }

//   return combined;
// }


// let x = `select p.* from courses c inner join (select sc.* from secondary_courses sc inner join (select Max(id), Max(user_id), class_id as max_class_id from users_secondary_courses group by class_id) y where y.max_class_id = sc.id) p where p.parent_id = c.id and c.term = '${term}' and c.year = ${year};`
// 'select Max(id), Max(user_id), class_id as max_class_id from users_secondary_courses group by class_id)'
// for (let i = 6850; i < 6900; i++) {
//   let user_id = 1 + Math.floor(Math.random() * 2);
//   let query =  `insert into users_courses set user_id = ${user_id}, class_id = ${i}`;  
//   console.log('query :', query)
//   db.queryAsync(query).spread(courses => courses)
// }
module.exports = new SecondaryCourses();
// module.exports.getNumberOfRecordsByUser(1)
// .then(x => console.log('x :', x))
// .catch(e => console.log('e :', e))

// module.exports.getStatus(100, 'spring', 2018, 59)
// .then(x => console.log('status :', x))
// .catch(e => console.log(e))




// module.exports.getEmailsForSection(54)
// .then(y => console.log('ydfdfg :', y))
// module.exports.getTrackedSections('spring', 2018)
// .then(x => console.log('x :', x))
// module.exports.getSectionsForCourse(6899)
// .then(x => console.log('x :', x))

// module.exports.getSections(615)
// .then(x => console.log(x));


