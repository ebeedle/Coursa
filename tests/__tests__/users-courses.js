const { testFunctions, users_courses } = require('../../server/models')

describe('users-courses', () => {

  describe('isAlreadyTrackingCourse', () => {
    test('shoud register if user has tracked course', (done) => {  
      return users_courses.isAlreadyTrackingCourse(100000, 100000)
      .then(courses => {
        expect(courses.length > 0).toBe(true);
        done()
      })
      .catch(e => console.log('e :', e))
    })
  })

  describe('getCoursesTracked', () => {
    test('should show which courses a user is tracking', done => {
      return users_courses.getCoursesTracked(100000)
      .then(courses => {
        console.log('courses tracked by user :', courses);
        expect(courses.length).toBe(1);
        done();
      })
    })
  })
})
