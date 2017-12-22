const db = require('./server/db/index.js')
const models = require('./server/models/index2.js')




// let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
// let preference = ['e', 't', 'b']




// function combineArrs(sections, lectures) {
//   let combined = [];
//   //while sections
//   //for every two lectures, add a section;
//   while (lectures.length || sections.length) {
//     if (lectures.length) {
//       let s = lectures.pop();
//       console.log('s :', s)
//       combined.push(s);
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

// let sec = [1,23]
// let lec = [533];

// console.log(combineArrs(lec, sec));

// for (let i = 1; i < 3927; i++) {
//   let class_id = i;
//   let user_id = Math.floor(Math.random() * 30);
//   models.UsersSecondaryCourses.create({class_id: class_id, user_id: user_id})
// }

// for (let j = 1; j < 6899; j++) {
//   let class_id = j;
//   let user_id = Math.floor(Math.random() * 30);
//   models.users_courses.create({class_id: class_id, user_id: user_id}) 
// }

// for (let i = 6; i < 30; i++) {
//   let email = '';
//   for (let j = 0; j < 10; j++) {
//     let num = Math.floor(Math.random() * 26);
//     email += alphabet[num];
//   }
//   email += '@gmail.com';
//   models.users.create({email: email, phone: '9254825070', preference: preference[Math.floor(Math.random() * 3)]})
// }

// let emails = ['e', 'b', 't']

// let realEmails =  ['s', 'r', 'x', 't', 'y']
// for (let i = 0; i < realEmails.length; i++) {
//   models.users.create({email: realEmails[i], phone: '9254825070'  , preference: emails[Math.floor(Math.random() * 3)]})
// }
// let home = require('./client/components/app.jsx');




//add phone number to users column to users column
//add preference (email, phone, both) to users column
//query for email and phone number, preference

//depending on preference, send them email/text/both;



//query for
// console.log('home :', home)

// var accountSid = 'ACd3d1d3f001bdf892d77a4ffec25d8653'; 
// var authToken = '087dd89813de9e0a35479ffc4df53f97'; 
 
// //require the Twilio module and create a REST client 
// var client = require('twilio')(accountSid, authToken); 

//     client.messages.create({ 
//         to: "+19253099343", 
//         from: "+19252786052", 
//         body: "hey dad", 
//     }, function(err, message) { 
//         console.log(message.sid); 
//     });


// for (let i = 0; i < 500; i++) {
//   for (let j = 0; j < 5; j++) {
//     let user = 1 + Math.floor(21 * Math.random());
//     models.users_courses.create({user_id: user, class_id: i})
//     // models.courses.create({user_id: user, class_id: i})
//   }
// }

// // models.users_courses.create({user_id: 1000, class_id: 1000})
// // .then(x => {
// //   return models.users_courses.get({user_id: 1000})
// // })
// // .then(y => {
// //   console.log('y has length :', y.length === 1);
// // })



// uc davis
// city college of san Francisco


// https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudent.htm

// https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm


// selectedTerm:FA17
// xsoc_term:
// loggedIn:false
// tabNum:
// selectedSubjects:AIP 
// selectedSubjects:AAS 
// selectedSubjects:AWP 
// selectedSubjects:ANES
// selectedSubjects:ANBI
// selectedSubjects:ANAR
// selectedSubjects:ANTH
// selectedSubjects:ANSC
// selectedSubjects:AESE
// selectedSubjects:AUD 
// selectedSubjects:BENG
// selectedSubjects:BNFO
// selectedSubjects:BIEB
// selectedSubjects:BICD
// selectedSubjects:BIPN
// selectedSubjects:BIBC
// selectedSubjects:BGGN
// selectedSubjects:BGRD
// selectedSubjects:BGSE
// selectedSubjects:BILD
// selectedSubjects:BIMM
// selectedSubjects:BISP
// selectedSubjects:BIOM
// selectedSubjects:CMM 
// selectedSubjects:CENG
// selectedSubjects:CHEM
// selectedSubjects:CHIN
// selectedSubjects:CLIN
// selectedSubjects:CLRE
// selectedSubjects:COGS
// selectedSubjects:COMM
// selectedSubjects:COGR
// selectedSubjects:CSE 
// selectedSubjects:ICAM
// selectedSubjects:CONT
// selectedSubjects:CGS 
// selectedSubjects:CAT 
// selectedSubjects:TDDM
// selectedSubjects:TDHD
// selectedSubjects:TDMV
// selectedSubjects:TDTR
// selectedSubjects:DSC 
// selectedSubjects:DSE 
// selectedSubjects:DERM
// selectedSubjects:DSGN
// selectedSubjects:DOC 
// selectedSubjects:ECON
// selectedSubjects:EDS 
// selectedSubjects:ERC 
// selectedSubjects:ECE 
// selectedSubjects:EMED
// selectedSubjects:ENG 
// selectedSubjects:ENVR
// selectedSubjects:ESYS
// selectedSubjects:ETHN
// selectedSubjects:EXPR
// selectedSubjects:FMPH
// selectedSubjects:FPM 
// selectedSubjects:FILM
// selectedSubjects:GPCO
// selectedSubjects:GPEC
// selectedSubjects:GPGN
// selectedSubjects:GPIM
// selectedSubjects:GPLA
// selectedSubjects:GPPA
// selectedSubjects:GPPS
// selectedSubjects:GLBH
// selectedSubjects:HLAW
// selectedSubjects:HITO
// selectedSubjects:HIAF
// selectedSubjects:HIEA
// selectedSubjects:HIEU
// selectedSubjects:HILA
// selectedSubjects:HISC
// selectedSubjects:HINE
// selectedSubjects:HIUS
// selectedSubjects:HIGR
// selectedSubjects:HILD
// selectedSubjects:HDP 
// selectedSubjects:HUM 
// selectedSubjects:INTL
// selectedSubjects:JAPN
// selectedSubjects:JUDA
// selectedSubjects:LATI
// selectedSubjects:LAWS
// selectedSubjects:LHCO
// selectedSubjects:LISL
// selectedSubjects:LIAB
// selectedSubjects:LIDS
// selectedSubjects:LIFR
// selectedSubjects:LIGN
// selectedSubjects:LIGM
// selectedSubjects:LIHL
// selectedSubjects:LIIT
// selectedSubjects:LIPO
// selectedSubjects:LISP
// selectedSubjects:LTAM
// selectedSubjects:LTCO
// selectedSubjects:LTCS
// selectedSubjects:LTEU
// selectedSubjects:LTFR
// selectedSubjects:LTGM
// selectedSubjects:LTGK
// selectedSubjects:LTIT
// selectedSubjects:LTKO
// selectedSubjects:LTLA
// selectedSubjects:LTRU
// selectedSubjects:LTSP
// selectedSubjects:LTTH
// selectedSubjects:LTWR
// selectedSubjects:LTEN
// selectedSubjects:LTWL
// selectedSubjects:LTEA
// selectedSubjects:MMW 
// selectedSubjects:MBC 
// selectedSubjects:MATS
// selectedSubjects:MATH
// selectedSubjects:MSED
// selectedSubjects:MAE 
// selectedSubjects:MDE 
// selectedSubjects:MED 
// selectedSubjects:MUIR
// selectedSubjects:MCWP
// selectedSubjects:MUS 
// selectedSubjects:NANO
// selectedSubjects:NEU 
// selectedSubjects:OPTH
// selectedSubjects:ORTH
// selectedSubjects:PATH
// selectedSubjects:PEDS
// selectedSubjects:PHAR
// selectedSubjects:SPPS
// selectedSubjects:PHIL
// selectedSubjects:PHYS
// selectedSubjects:POLI
// selectedSubjects:PSY 
// selectedSubjects:PSYC
// selectedSubjects:RMAS
// selectedSubjects:RAD 
// selectedSubjects:MGTF
// selectedSubjects:MGT 
// selectedSubjects:MGTA
// selectedSubjects:RELI
// selectedSubjects:RMED
// selectedSubjects:REV 
// selectedSubjects:SOMI
// selectedSubjects:SOMC
// selectedSubjects:SIOC
// selectedSubjects:SIOG
// selectedSubjects:SIOB
// selectedSubjects:SIO 
// selectedSubjects:SXTH
// selectedSubjects:SOCG
// selectedSubjects:SOCE
// selectedSubjects:SOCI
// selectedSubjects:SE  
// selectedSubjects:SURG
// selectedSubjects:TDAC
// selectedSubjects:TDDE
// selectedSubjects:TDDR
// selectedSubjects:TDGE
// selectedSubjects:TDGR
// selectedSubjects:TDHT
// selectedSubjects:TDPW
// selectedSubjects:TDPR
// selectedSubjects:TWS 
// selectedSubjects:TMC 
// selectedSubjects:USP 
// selectedSubjects:VIS 
// selectedSubjects:WARR
// selectedSubjects:WCWP
// selectedSubjects:WES 
// _selectedSubjects:1
// schedOption1:true
// _schedOption1:on
// _schedOption11:on
// _schedOption12:on
// schedOption2:true
// _schedOption2:on
// _schedOption4:on
// _schedOption5:on
// _schedOption3:on
// _schedOption7:on
// _schedOption8:on
// _schedOption13:on
// _schedOption10:on
// _schedOption9:on
// schDay:M
// _schDay:on
// schDay:T
// _schDay:on
// schDay:W
// _schDay:on
// schDay:R
// _schDay:on
// schDay:F
// _schDay:on
// schDay:S
// _schDay:on
// schStartTime:12:00
// schStartAmPm:0
// schEndTime:12:00
// schEndAmPm:0
// _selectedDepartments:1
// schedOption1Dept:true
// _schedOption1Dept:on
// _schedOption11Dept:on
// _schedOption12Dept:on
// schedOption2Dept:true
// _schedOption2Dept:on
// _schedOption4Dept:on
// _schedOption5Dept:on
// _schedOption3Dept:on
// _schedOption7Dept:on
// _schedOption8Dept:on
// _schedOption13Dept:on
// _schedOption10Dept:on
// _schedOption9Dept:on
// schDayDept:M
// _schDayDept:on
// schDayDept:T
// _schDayDept:on
// schDayDept:W
// _schDayDept:on
// schDayDept:R
// _schDayDept:on
// schDayDept:F
// _schDayDept:on
// schDayDept:S
// _schDayDept:on
// schStartTimeDept:12:00
// schStartAmPmDept:0
// schEndTimeDept:12:00
// schEndAmPmDept:0
// courses:
// sections:
// instructorType:begin
// instructor:
// titleType:contain
// title:
// _hideFullSec:on
// _showPopup:on

