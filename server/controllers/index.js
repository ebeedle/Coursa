const path = require('path');
const models = require('../models');
const passport = require('passport');

// module.exports.getPage = (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/index.html'))
// };

module.exports.getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/home.html'))
}

module.exports.logIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(500).json({ error: 'User not found.' }); }
    req.logIn(user, (err) => {
        if (err) {
            return res.status(500).json({
                err: 'Could not log in user'
            });
        }
        res.status(200).json({
            status: 'Login successful!'
        });
    });
  })(req, res, next);
}

module.exports.getTrackedCoursesForUser = (req, res) => {
  return models.users_courses.getCoursesTracked(req.user.id)
  .then(data => {
    
    return models.UsersSecondaryCourses.getCoursesTracked(req.user.id, data)
  })
  .then(data => {
    res.send(JSON.stringify(data));
  })
  .catch(err => {
    console.log('error :', err)
    res.end()
  })
}

module.exports.signUp = (req, res) => {
  return models.users.handleSignup(req.body.username, req.body.password, req.body.number)
    .then(() => {
      res.status(200).json({
                status: 'Login successful!'
      });
    })
    .catch(err => {
      return res.status(500).json({
                err: 'Could not sign user up'
      });
    })
}


