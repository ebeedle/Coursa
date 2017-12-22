const app = require('./app.js');
const port = process.env.PORT;	

// const p = require('./sms.js')

app.listen(port, () => {
  console.log(`scanner is listening on ${port}`);
});


/*

//store class, url of request
//each student stores multiple classes

//iterate through all classes - if opening, notify all students who are
//signed up for class




*/