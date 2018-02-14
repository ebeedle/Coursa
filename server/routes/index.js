const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const models = require('../models')
const ctrls = require('../controllers');

const routesUsingHomePage = ['/', '/login', '/signup', '/home']

//GETS
router.get(routesUsingHomePage, ctrls.getHomePage)
router.get('/allCourses', ctrls.getAllCourses)
router.get('/coursesByCode', ctrls.getCoursesByCode)
router.get('/courseCodes', ctrls.getAllCourseCodes)
router.get('/logout', ctrls.logOut);
router.get('/sections', ctrls.getSections)
router.get('/trackedCourses', ctrls.getTrackedCoursesForUser)

//POSTS
router.post('/login', ctrls.logIn);
router.post('/signup', ctrls.signUp)
router.post('/trackCourse', ctrls.trackCourse);
router.post('/trackSection', ctrls.trackSection);
router.post('/untrack', ctrls.untrack);

module.exports = router;