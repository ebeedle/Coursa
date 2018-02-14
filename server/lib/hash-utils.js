const crypto = require('crypto');

exports.createHash = (data, salt) => {
  let shasum = crypto.createHash('sha256');
  shasum.update(data + salt);
  return shasum.digest('hex');
};

exports.compareHash = (attempted, stored, salt) => {
  return stored === exports.createHash(attempted, salt);
};

exports.createSalt = () => {
  return crypto.randomBytes(32).toString('hex');
};


/*
//assume that all tracked courses are open

- every day iterate through courses, making sure that 
our courses up to date


- sign up for bio101
- check to make sure valid course
-if this is the first time someone has signed up for this courses
  -make http request to bio101, and store status in courses;
-add to users_courses
- add to tracked 


-every 15 mins
  -query courses that are tracked 
    -make http request to each of them
	  -if new status changes from closes-wait, wait-open, closed-open
	    -alert users of those courses of change
	    -change status to new status

//at home be able to input a number and have server check if 
//valid course




  - courses that are tracked
  - 
-query db every 15 minutes letting people know who signed up if course
is open



*/