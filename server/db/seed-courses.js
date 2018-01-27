var request = require('request');
var cheerio = require('cheerio');
const Promise = require('bluebird');
var db = require('./index.js')
var seedModules = require('./seed2.js')
const getClasses = seedModules.getClasses;
const scrapeClasses = seedModules.scrapeClasses;
const insertSecondaryClasses = seedModules.insertSecondaryClasses;




// insertSecondaryClasses(1, 20643, 2182)

var callback = function(x) {
  console.log('x :', x);
}

// let termInfo = {
//         termNumber: '3A770',
//         nodeNumber: 2182
//       }
// getClasses(callback, termInfo, 200, 100, 120)

scrapeClasses('spring', 2018);


// function getTermNumber(term, year) {
//   let terms = {
//     2017: {
//       winter: '3A618'
//     },
//     2018: {
//       spring: '3A770'
//     }
//   }

//   term = term.toLowerCase();
//   year = +year;

//   if (!terms[year] || !terms[year][term]) {
//     return null;
//   }
//   return terms[year][term];
// }

// let z = getTermNumber('Spring', 2018)
// console.log('z :', z);

// findLastPage('3A770', page => {
//   console.log('page :', page);
// })
// function findLastPage(termNumber, callback, low=0, high=1000) {

//   if (low === high) {
    
//     return callback(low - 1);
//   }

//   let midpoint = Math.floor((low + high) / 2);
//   request(`http://classes.berkeley.edu/search/site?page=${midpoint}&retain-filters=1&f[0]=im_field_term_name%${termNumber}`, (err, res, body) => {
//     if (err) {
//       return console.log('error :', err);
//     } 
//     var $ = cheerio.load(body);
//     var classes = $('.search-result .handlebarData') 

//     if (classes.length === 0) {
//       console.log('not valid page :', midpoint);
//       return findLastPage(termNumber, callback, low, midpoint);
//     } else {
//       console.log('valid page :', midpoint);
//       return findLastPage(termNumber, callback, midpoint+1, high);
//     }
//   })
// }

// findLastPage('3A770');

// if (!db.queryAsync) {
//     db = Promise.promisifyAll(db);
// }

// var getClasses = function(callback, current=303, obj={}) {
//   console.log('current :', current)
  
//   request(`http://classes.berkeley.edu/search/site?page=${current}&retain-filters=1&f[0]=im_field_term_name%3A618`, (err, res, body) => {
//     if (err) {
//       return callback(err, null)
//     }
//     var $ = cheerio.load(body);
//     var classes = $('.search-result .handlebarData')
//     if (current >= 304) {
//         return callback(null, obj);	
//     }
//     // if (classes.length === 0) {
//     //   console.log('endPage :', current);
//     //   return callback(null, obj);
//     // }

//     for (var i = 0; i < classes.length; i++) {
//       var data = classes.eq(i).data('json');
//       var id = data.id;
//       var className = data.displayName;
//       var instructors = data.meetings[0].assignedInstructors;
//       var teachers = ''
//       for (var i = 0; i < instructors.length; i++) {
//         var teacher = instructors[i].instructor.names[0].formattedName;
//         if (i === 0) {
//           teachers += teacher;
//         } else {
//           teachers += `, ${teacher}`
//         }
//       }

//       obj[id] = {
//         className: className.slice(10),
//         teachers: teachers
//       }
//     }
//       return getClasses(callback, current+1, obj)
//   })
// }


//   getClasses((err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log("data :", data)
//   })

// 	// getClasses((err, data) => {
// 	//   if (err) {
// 	//     throw err;
// 	//   }
//  //    var numbers = Object.keys(data);
    
//  //    insertToDB(data, numbers);
//  //  })

//  //  function insertToDB(data, numbers, i=0) {
//  //  	if (i === numbers.length) {
//  //  		console.log('done');
//  //  		return;
//  //  	}
//  //  	var number = numbers[i];
//  //  	var className = data[number];
//  //  	number = +number;
// 	// 	db.queryAsync(`insert into courses (number, name) values (${number}, '${className}')`)
// 	// 	  .then(x => {
// 	// 	  	return insertToDB(data, numbers, i+1)
// 	// 	  })
// 	// 	  .catch(err => {
// 	// 	  	console.log(err);
// 	// 	  	return;
// 	// 	  })
//  //  }




// var data = {"id":41559,"number":"002","component":{"code":"SEM","description":"Seminar"},"displayName":"2018 Spring NESTUD 24 002 SEM 002","startDate":"2018-01-16","endDate":"2018-05-04","association":{"primary":true,"primaryAssociatedComponent":{"code":"SEM","description":"Seminar"},"primaryAssociatedSectionId":41559},"enrollmentStatus":{"status":{"code":"O","description":"Open"},"enrolledCount":16,"reservedCount":0,"waitlistedCount":0,"minEnroll":0,"maxEnroll":18,"maxWaitlist":5,"openReserved":0},"printInScheduleOfClasses":true,"addConsentRequired":{"code":"N","description":"No Special Consent Required"},"dropConsentRequired":{"code":"N","description":"No Special Consent Required"},"graded":true,"feesExist":false,"roomShare":false,"sectionAttributes":[{"attribute":{"code":"VUOC","description":"VCREDIT","formalDescription":"Variable Units of Credit"},"value":{"code":"F","description":"Fixed","formalDescription":"Fixed Unit 1 Value"}},{"attribute":{"code":"TIE","description":"Instr Type","formalDescription":"Instructional Activity Types"},"value":{"code":"SEMT","description":"Seminar-Topical","formalDescription":"Transmitting the Knowledge Base"}},{"attribute":{"code":"NOTE","formalDescription":"Special Title"},"value":{"code":"2","formalDescription":"Demons, Spirits of the Dead and Other Liminal Beings in Ancient Egypt"}},{"attribute":{"code":"NOTE","formalDescription":"Class Description"},"value":{"code":"4","formalDescription":"The ancient Egyptian netherworld was populated by embodied creatures with supernatural powers and hybrid appearance, which we may conventionally call \u201cdemons\u201d and which function, as in many other ancient and modern religions, as a sort of lesser gods, protectors or genii.  In this seminar a catalogue of such creatures will be presented and discussed together with other liminal beings such as the spirits of the dead, which occur in the funerary and magical sources (papyri, coffins, tomb decorations and magical objects) produced in particular during the 1st Millennium BCE in Egypt. Concepts such as "magic", "liminality" and "supernatural" will be discussed according to the evidence provided by the ancient Egyptian written and material sources and in comparison with other ancient and modern religions."}}],"meetings":[{"number":1,"meetsDays":"Th","meetsMonday":false,"meetsTuesday":false,"meetsWednesday":false,"meetsThursday":true,"meetsFriday":false,"meetsSaturday":false,"meetsSunday":false,"startTime":"14:00:00","endTime":"14:59:00","location":{"code":"BARR78","description":"Barrows 78"},"building":{"code":"1761","description":"Barrows"},"assignedInstructors":[{"assignmentNumber":1,"instructor":{"identifiers":[{"type":"campus-uid","id":"1081205","disclose":true}],"names":[{"type":{"code":"PRF","description":"Preferred"},"familyName":"Lucarelli","givenName":"Rita","formattedName":"Rita  Lucarelli","disclose":true,"uiControl":{"code":"U","description":"Edit - No Delete"},"fromDate":"1902-02-01"},{"type":{"code":"PRI","description":"Primary"},"familyName":"Lucarelli","givenName":"Rita","formattedName":"Rita  Lucarelli","disclose":true,"uiControl":{"code":"D","description":"Display Only"},"fromDate":"2014-06-30"}]},"role":{"code":"PI","description":"1-TIC","formalDescription":"Teaching and In Charge"},"printInScheduleOfClasses":true,"gradeRosterAccess":{"code":"A","description":"Approve","formalDescription":"Approve"}}],"startDate":"2018-01-16","endDate":"2018-05-04","meetingTopic":[]}],"academicOrganization":{"code":"NESTUD","description":"Near Eastern Studies","formalDescription":"Near Eastern Studies"},"academicGroup":{"code":"CLS","description":"L&S","formalDescription":"College of Letters and Science"},"class":{"course":{"identifiers":[{"type":"cs-course-id","id":"116717"}],"subjectArea":{"code":"NESTUD","description":"Near Eastern Studies"},"catalogNumber":{"number":"24","formatted":"24"},"displayName":"NESTUD 24","title":"Freshman Seminars","transcriptTitle":"FRESHMAN SEMINARS"},"offeringNumber":1,"session":{"term":{"id":"2182","name":"2018 Spring"},"id":"1","name":"Regular Academic Session"},"number":"002","displayName":"2018 Spring NESTUD 24 002","allowedUnits":{"minimum":1,"maximum":1,"forAcademicProgress":1,"forFinancialAid":1},"status":[]},"attributes":{"VUOC":[{"attribute":{"code":"VUOC","description":"VCREDIT","formalDescription":"Variable Units of Credit"},"value":{"code":"F","description":"Fixed","formalDescription":"Fixed Unit 1 Value"}}],"TIE":[{"attribute":{"code":"TIE","description":"Instr Type","formalDescription":"Instructional Activity Types"},"value":{"code":"SEMT","description":"Seminar-Topical","formalDescription":"Transmitting the Knowledge Base"}}],"NOTE":{"special-title":{"attribute":{"code":"NOTE","formalDescription":"Special Title"},"value":{"code":"2","formalDescription":"Demons, Spirits of the Dead and Other Liminal Beings in Ancient Egypt"}},"class-description":{"attribute":{"code":"NOTE","formalDescription":"Class Description"},"value":{"code":"4","formalDescription":"The ancient Egyptian netherworld was populated by embodied creatures with supernatural powers and hybrid appearance, which we may conventionally call \u201cdemons\u201d and which function, as in many other ancient and modern religions, as a sort of lesser gods, protectors or genii.  In this seminar a catalogue of such creatures will be presented and discussed together with other liminal beings such as the spirits of the dead, which occur in the funerary and magical sources (papyri, coffins, tomb decorations and magical objects) produced in particular during the 1st Millennium BCE in Egypt. Concepts such as "magic", "liminality" and "supernatural" will be discussed according to the evidence provided by the ancient Egyptian written and material sources and in comparison with other ancient and modern religions."}}}}}

// var x = JSON.parse(data);
// console.log('x :', x);






// var getClasses2 = function(callback, obj={}, start=0, end=70, stop=345) {
//   if (end > stop) {
//     end = stop;
//   }
//   console.log('new start :', start, 'end :', end-1)
//   let count = 0;
//   for (let k = start; k < end; k++) {
//              // `http://classes.berkeley.edu/search/class?page=6&f[0]=im_field_term_name%3A770`
//     request(`http://classes.berkeley.edu/search/site?page=${k}&retain-filters=1&f[0]=im_field_term_name%3A618`, (err, res, body) => {
//       console.log('current :', k, count);
//       if (err) {
//         return callback(err, null)
//       }
//       var $ = cheerio.load(body);
//       var classes = $('.search-result .handlebarData') 
//       count++; 
//       if (classes.length === 0) {
//         console.log('endPage :', k);
//         console.log('classes :', classes)
//         // console.log('classes :', classes)
//         // return callback(null, obj);
//       } else {
//         for (var i = 0; i < classes.length; i++) {
//           var data = classes.eq(i).data('json');
//           var className = '';
//           var teachers = '';
//           var status = '';
//           let code = '';
//           let description = '';

//           var id = data.id;
//           if (data.displayName) {
//             className = data.displayName;
//           }
//           if (data.meetings && data.meetings[0] && data.meetings[0].assignedInstructors) {
//             instructors = data.meetings[0].assignedInstructors;
//               for (var j = 0; j < instructors.length; j++) {
//                 if (instructors[j].instructor && instructors[j].instructor.names && instructors[j].instructor.names[0]) {
//                   var teacher = instructors[j].instructor.names[0].formattedName;
//                   if (j === 0) {
//                     teachers += teacher;
//                   } else {
//                     teachers += `, ${teacher}`
//                   }
//                 }
//               }
//           }
        
//             code = data.academicOrganization.code;
//             description = data.academicOrganization.description;

//           if (data.academicOrganization.description) {

//           }
//           if (data.enrollmentStatus && data.enrollmentStatus.status && data.enrollmentStatus.status.code) {
//             status = data.enrollmentStatus.status.code
//           }
//           // console.log('className :', className)

//           obj[id] = {
//             className: className.slice(10),
//             teachers: teachers,
//             status: status,
//             code: code,
//             description: description
//           }
//         }
//     }
//       if (count >= end - start && end >= stop) {
//         return callback(null, obj); 
//       }//if end is 345 and count >= 
//       else if (count >= end - start) {
//         console.log('doing it again : count :', count)
//         return getClasses2(callback, obj, end, end+70, stop)
//       }
//     })
//   }
// }

// var getClasses = function(callback, current=0, obj={}) {
  
//   request(`http://classes.berkeley.edu/search/site?page=${current}&retain-filters=1&f[0]=im_field_term_name%3A618`, (err, res, body) => {
//     console.log('current :', current);
//     if (err) {
//       return callback(err, null)
//     }
//     var $ = cheerio.load(body);
//     var classes = $('.search-result .handlebarData')
//     if (current === 4) {
//         return callback(null, obj);  
//     }
//     if (classes.length === 0) {
//       console.log('endPage :', current);
//       return callback(null, obj);
//     }
    
//     for (var i = 0; i < classes.length; i++) {
//       var data = classes.eq(i).data('json');
//       var className = '';
//       var teachers = '';
//       var status = '';

//       var id = data.id;
//       if (data.displayName) {
//         className = data.displayName;
//       }
//       if (data.meetings && data.meetings[0] && data.meetings[0].assignedInstructors) {
//         instructors = data.meetings[0].assignedInstructors;
//           for (var j = 0; j < instructors.length; j++) {
//             if (instructors[j].instructor && instructors[j].instructor.names && instructors[j].instructor.names[0]) {
//               var teacher = instructors[j].instructor.names[0].formattedName;
//               if (j === 0) {
//                 teachers += teacher;
//               } else {
//                 teachers += `, ${teacher}`
//               }
//             }
//           }
//       }
//       if (data.enrollmentStatus && data.enrollmentStatus.status && data.enrollmentStatus.status.code) {
//         status = data.enrollmentStatus.status.code
//       }
//       console.log('className :', className)

//       obj[id] = {
//         className: className.slice(10),
//         teachers: teachers,
//         status: status
//       }
//     }
//       return getClasses(callback, current+1, obj)
//   })
// }


// getClasses2((err, data) => {
//   if (err) {
//     throw err;
//   }
//   // console.log('data :', data)
//  var numbers = Object.keys(data);
//  // console.log('numbers :', numbers)
  
//  insertToDB(data, numbers);
// })