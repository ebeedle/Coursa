//////////////////////////////////////////////////////////////////////////////////////////////////////
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
const Promise = require('bluebird');
let requestP = Promise.promisify(request);
var db = require('./index.js')
let courseModel = require('../models/index2.js').courses;
let secondaryCourses = require('../models/index2.js').secondaryCourses;

// console.log('secondaryCourses :', secondaryCourses)

if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
}


var getClasses = function(callback, termInfo, stop, start=0, end=15, errors=0) {
  //keep track of count in getClasses and 
  if (end > stop) {
    end = stop;
  }
  console.log('new start :', start, 'end :', end-1)
  let count = 0;
  //3A618
  for (let k = start; k < end; k++) {
    axios.get(`http://classes.berkeley.edu/search/site?page=${k}&retain-filters=1&f[0]=im_field_term_name%${termInfo.termNumber}`)
      .then(response => {    
        let body = response.data;
        console.log('current :', k, count);
        let $ = cheerio.load(body);
        let classes = $('.search-result .handlebarData') 
        count++; 
        if (classes.length === 0) {
          console.log('classes : NO LENGTH', classes, 'k :', k)
        } else {
          for (let i = 0; i < classes.length; i++) {
            let data = classes.eq(i).data('json');
            if (typeof data === 'object') {
              let classInfo = parseClassInfo(data);

              courseModel.create(classInfo)
              .then(info => {
                return insertSecondaryClasses(info.insertId, classInfo.number, termInfo.nodeNumber)
              })
              .catch(e => {
                console.log('error :', e)
              })
            } else {
              console.log('issue with parsing data :', data);
            }
          }
        }

        if (count >= end - start && end >= stop) {
          callback(null); 
        }
        //if end is 345 and count >= 
        else if (count >= end - start) {
          
          setTimeout(function(){
            console.log('doing it again : count :', count)
            getClasses(callback, termInfo, stop, end, end+15)
          }, 10000);
        } else {
          // nothing
        }
    })
    .catch(error => {
      if (errors > 2) {
        console.log('error :', error);
        getClasses(callback, termInfo, stop, end, end+15)
      } else {
        getClasses(callback, termInfo, stop, start, end, errors+1);
      }
    })
  }
}

function parseClassInfo(data) {
  // console.log('data :', typeof data);
  let className = '';
  let teachers = '';
  let status = '';
  let code = '';
  let description = '';
  let year= 0;
  let term = '';

  let id = data.id;
  if (data.displayName) {
    className = data.displayName;
    year = +className.split(' ')[0];
    term = className.split(' ')[1].toLowerCase();
  }
  if (data.meetings && data.meetings[0] && data.meetings[0].assignedInstructors) {
    instructors = data.meetings[0].assignedInstructors;
      for (let j = 0; j < instructors.length; j++) {
        if (instructors[j].instructor && instructors[j].instructor.names && instructors[j].instructor.names[0]) {
          let teacher = instructors[j].instructor.names[0].formattedName;
          if (j === 0) {
            teachers += teacher;
          } else {
            teachers += `, ${teacher}`
          }
        }
      }
  }
  if (data.academicOrganization && data.academicOrganization.code) {
    code = data.academicOrganization.code;
  }
  if (data.academicOrganization && data.academicOrganization.description) {
    description = data.academicOrganization.description;
  }
  if (!data.academicOrganization) {
    console.log('className without desc or code:', typeof data);
  }
  if (data.enrollmentStatus && data.enrollmentStatus.status && data.enrollmentStatus.status.code) {
    status = data.enrollmentStatus.status.code
  } 

  if (teachers.length > 150) {
    teachers = teachers.slice(0, 150);
  }
  let shortenedName;
  if (className) {
    let nameArr = className.split(' ');
    shortenedName = nameArr.slice(2).join(' ');
  }
  let classInfo = {
    name: shortenedName,
    teachers: teachers,
    status: status,
    code: code,
    description: description,
    number: +id,
    year: year,
    term, term
  } 

  return classInfo;
}


function findLastPage(termNumber, callback, low=0, high=1000) {

  if (low === high) {
    
    return callback(low - 1);
  }
//http://classes.berkeley.edu/json-all-sections/${parent_number}/20496/2182
  let midpoint = Math.floor((low + high) / 2);
  request(`http://classes.berkeley.edu/search/site?page=${midpoint}&retain-filters=1&f[0]=im_field_term_name%${termNumber}`, (err, res, body) => {
    if (err) {
      return console.log('error :', err);
    } 
    var $ = cheerio.load(body);
    var classes = $('.search-result .handlebarData') 

    if (classes.length === 0) {
      console.log('not valid page :', midpoint);
      return findLastPage(termNumber, callback, low, midpoint);
    } else {
      console.log('valid page :', midpoint);
      return findLastPage(termNumber, callback, midpoint+1, high);
    }
  })
}

function scrapeClasses(term, year) {
  let termInfo = getTermInfo(term, year);
  let termNumber = termInfo.termNumber;
  findLastPage(termNumber, page => {
    
    getClasses(err => {
      if (err) {
        throw err;
      }
     console.log('done');
    }, termInfo, page)
  });
}

scrapeClasses('spring', 2018);

function getTermInfo(term, year) {
  let terms = {
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

  term = term.toLowerCase();
  year = +year;

  if (!terms[year] || !terms[year][term]) {
    return null;
  }
  return terms[year][term];
}

function insertSecondaryClasses(parent_id, parent_number, nodeNumber, count=0) {
  console.log('node number :', nodeNumber)
  let nodesUrl = `http://classes.berkeley.edu/json-all-sections/${parent_number}/${parent_number}/${nodeNumber}`;
  axios.get(nodesUrl)
    .then(res => {
      let body = res.data;
      let nodes = body.nodes;
      // console.log('length :', nodes.length)
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          insertSecondaryClass(parent_id, parent_number, nodes[i])
        }

        //after this is done, increment count
        //if count is over threshold, recurse prev function

      }
    })
    .catch(e => {
      if (count > 4) {
        console.log('error! :', e)
        //increment count if this occurs
        //if count is over threshold, call next function
      } else {
        insertSecondaryClasses(parent_id, parent_number, nodeNumber, count+1)
      }
    })
}


  // insertSecondaryClasses(6229, 46482)

  function insertSecondaryClass(parent_id, parent_number, node) {
    let nodeInfo = JSON.parse(node.node.json);
    let name = nodeInfo.displayName.split(' ').slice(2).join(' ');
    let status = nodeInfo.enrollmentStatus.status.code;
    let courseCode = nodeInfo.academicOrganization.code;
    let id = nodeInfo.id;

    let courseInfo = {
       parent_id: parent_id,
       parent_number: parent_number,
       number: id,
       name: name,   
       code: courseCode,
       status: status
    }

    secondaryCourses.create(courseInfo)

    // console.log('courseInfo :', courseInfo)
  }






/*
//////////////////////////////////////////////////////////////////////////////////////////////////////




//use this set of functions to update status' of classes; 
//uncomment db.queryAsync section to do so


function makeRequests(classIDs, current=0) {
  if (current === classIDs.length) {
    console.log('done');
    return;
  }
  var classID = classIDs[current].number;
  var url = `http://classes.berkeley.edu/enrollment/update/2178/${classID}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log('class :', classID, 'enrollmentStatus :', JSON.parse(body).classSections[0].enrollmentStatus.status.code)
    return makeRequests(classIDs, current+1)
  })
}


// db.queryAsync(`select number from courses where id < 100`)
//   .then(data => {
//     console.log("data length :", data[0].length)
//     makeRequests(data[0]);
//   })
//   .catch(err => {
//     console.log(err);
//   })


//////////////////////////////////////////////////////////////////////////////////////////////////////


//225 - 239 - cant read 'code' of undefined

//
//user signs up with a classID
  //make http request to belkey${classID}
    //get result, update db with current status, and indicate tracked if not already
      //get id from courses
        //insert user into users_courses

//var emails = [];
//every 15 minutes
  //query all classes that are tracked
    //for each class, get status from db
      //make http request to berkelywebsite, get status
        //if status has changed updtate db
        //if status chaned from closed - waitlist or waitlist - open
          //query users_courses for all users tracking that class
            //push users to emails, repeat for each class
//iterate through courses again.
  //for each course id, query db
    //if not in db
      //return console.log('missing')

*/



/*
var allIdsInDB = function(obj={}) {
  // if (end > 50) {
  //   end = 50;
  // }
  // console.log('new start :', start, 'end :', end)
  let count = 0;
  let start = 301;
  let end = 345;
  for (let k = start; k < end; k++) {
    request(`http://classes.berkeley.edu/search/site?page=${k}&retain-filters=1&f[0]=im_field_term_name%3A618`, (err, res, body) => {
      console.log('current :', k, count);
      if (err) {
        return callback(err, null)
      }
      var $ = cheerio.load(body);
      var classes = $('.search-result .handlebarData') 
      count++; 
      if (classes.length === 0) {
        console.log('endPage :', k);
        console.log('classes :', classes)
        // console.log('classes :', classes)
        // return callback(null, obj);
      } else {
        for (var i = 0; i < classes.length; i++) {
          var data = classes.eq(i).data('json');
          var className = '';
          var teachers = '';
          var status = '';

          let id = data.id;
         
          db.queryAsync(`select * from courses where number = ${id}`)
               .then(x => {
                 if (!x[0].length) {
                  console.log('issue!!!!!!!!!!!!!!!!!!!')
                  console.log('id :', id, k)
                 }
               })
               .catch(err => {
                 console.log(err);
                 return;
               })
        }
      
    }

    
      if (count >= end - start + 1) {
        console.log('doneeee!')
        
      }//if end is 345 and count >= 
    })
  }
}


function insertToDB(data, numbers, i=0) {
  if (i === numbers.length) {
    console.log('done');
    return;
  }
  var number = numbers[i];
  var className = data[number].className;
  var teachers = data[number].teachers;
  let code = data[number].code;
  let description = data[number].description;
  let status = data[number].status;
  // var status = data[number].status;
  number = +number;
  db.queryAsync(`insert into courses (number, name, teachers, code, description, status) values (${number}, '${className}', "${teachers}", '${code}', '${description}', '${status}')`)
    .then(x => {
      return insertToDB(data, numbers, i+1)
    })
    .catch(err => {
      console.log(err);
      return;
    })
 }


 function handleQuotes(name) {
   var newName = '';
   for (var i = 0; i < name.length; i++) {
     if (name[i] === '\'') {
       newName += '"';
     } else {
       newName += name[i];
     }
   }
   return newName;
 }



//10 second wait;
  //6899 classes
  //3927 secondary_courses;



*/
// allIdsInDB()

module.exports.scrapeClasses = scrapeClasses;
module.exports.getClasses = getClasses;
module.exports.insertSecondaryClasses = insertSecondaryClasses;