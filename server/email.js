var nodemailer = require('nodemailer');
const emailHost = process.env.emailHost;
const password = process.env.password;


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailHost,
    pass: password
  }
});

module.exports = function(info) {

  // for (let i = 0; i < 100; i++) {
  // console.log('info :', info)
    var email = info.email;
    var classNumber = info.number;
    var statusChange = `switched from ${info.oldStatus} to ${info.newStatus}`
    var courseName = info.name;
    // console.log('info :', info)

    var mailOptions = {
      from: emailHost,
      to: email,
      subject: 'Class Opened',
      text: `${courseName} (number: ${classNumber}) has ${statusChange}`
    };



    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  

};

// let info = {
//   email: 'bill.beedle2@gmail.com',
//   number: 2344,
//   oldStatus: 'closed',
//   newStatus: 'open',
//   name: 'bio101'
// }

// module.exports(info);
