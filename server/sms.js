const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
module.exports = function(info) {
  
  var email = info.email;
  var classNumber = info.number;
  var statusChange = `switched from ${info.oldStatus} to ${info.newStatus}`
  var courseName = info.name;
  client.messages.create({ 
      to: `+1${info.phoneNumber}`, 
      from: "+19252786052", 
      body: `${courseName} (number: ${classNumber}) has ${statusChange}`, 
  }, function(err, message) { 
      console.log(message.sid); 
  });
  
}



// module.exports(info);


// module.exports = function(info) {
//     var email = info.email;
//     var classNumber = info.number;
//     var statusChange = `switched from ${info.oldStatus} to ${info.newStatus}`
//     var courseName = info.name;
//     console.log('info :', info)

//     var mailOptions = {
//       from: 'bill.beedle5@gmail.com',
//       to: email,
//       subject: 'Class Opened',
//       text: `${courseName} (number: ${classNumber}) has ${statusChange}`
//     };



//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

// };
