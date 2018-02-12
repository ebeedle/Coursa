const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const models = require('../models')
const ctrls = require('../controllers');

const routesUsingHomePage = ['/', '/login', '/signup', '/home']
router.get(routesUsingHomePage, ctrls.getHomePage)
router.post('/login', ctrls.logIn);
router.post('/signup', ctrls.signUp)
router.get('/trackedCourses', ctrls.getTrackedCoursesForUser)
router.get('/logout', ctrls.logOut);
router.post('/untrack', ctrls.untrack);
router.get('/coursesByCode', ctrls.getCoursesByCode)
router.get('/allCourses', ctrls.getAllCourses)
router.get('/courseCodes', ctrls.getAllCourseCodes)
router.get('/sections', ctrls.getSections)
router.post('/trackSection', ctrls.trackSection);
router.post('/trackCourse', ctrls.trackCourse);

module.exports = router;