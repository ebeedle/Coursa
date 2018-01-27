let db = require('../server/db');
const {courses, users, users_courses} = require('../server/models/index2.js')
const Promise = require('bluebird');
// console.log('db :', db);
// console.log('course models :', courses)

function sum(a, b) {
  return a + b;
}

beforeAll(() => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
}
  //connect to db
  //insert course into db
})

afterAll(() => {

  //delete course from db;
})

describe('courses', () => {
  beforeAll(() => {
    return courses.create({id: 100000, code: 'ABCD', name: 'test', term: 'spring', year: '2018' })
      .then(() => {
        return users.create({id: 100000, email: 'testuserBerkScanner@gmail.com'})
      })
      .then(user => {
        let userId = user.insertId;
        return users_courses.create({id: 100000, user_id: 100000, class_id: 100000})
      })
    //insert course with 'testing' code into db

    //create fake user
    //make fake user sign up for course (add record in users_courses)

  })

  afterAll(() => {
    return courses.delete({id: 100000})
    .then(() => {
      return users.delete({id: 100000})
    })
    .then(() => {
      return users_courses.delete({id: 100000})
    })
    //delete course with 'testing' code 
  })
  
  test('should be able to find all course codes', () => {
    expect.assertions(1);
    return courses.getAllCourseCodes()
    .then(codes => {
      expect(codes.length > 0).toBe(true)
    })
  
  })

  test('should be able to find courses by their course code', () => {
    expect.assertions(2);
    return courses.getCoursesByCode('ABCD')
    .then(courses => {
      expect(courses.length > 0).toBe(true);
      expect(courses[0].name === 'test').toBe(true);
    })
  })

  test('should be able to get new tracked courses', () => {
    expect.assertions(1);
    return courses.getTrackedCourses('spring', '2018')
    .then(courses => {
      courses = courses.filter(course => course.id === 100000);
      expect(courses.length === 1).toBe(true);
    })
  })

  test("should be able to find users' emails by course id", () => {
    expect.assertions(2);
    return courses.getEmailsForCourse(100000)
    .then(emails => {
      expect(emails.length > 0).toBe(true)
      expect(emails[0].email).toBe('testuserBerkScanner@gmail.com')
    })
  })
})

