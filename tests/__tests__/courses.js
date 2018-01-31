//db is defined in test-setup.js
const { courses, users, users_courses } = require('../../server/models')


describe('coursesss', () => {
  // test('2 + 2 equals 4', () => {
  //   expect(2 + 2).toBe(4);

  // })
  // test('expex 2, 2', () => {
  //   expect(2).toBe(2)
  // })
  beforeAll(() => {
    // return testFunctions.seedCoursesForTesting()
  })

  afterAll(() => {
    // return testFunctions.deleteSeedCoursesForTesting()
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

  test('should be able to tell when the database contains the course with specified course number', () => {
    expect.assertions(1);
    return courses.isValidCourse(100000)
    .then(result => {
      expect(result).toBe(true);
    })
  })

  test('should be able to tell when the database does not contain the course with the specified course number', () => {
    expect.assertions(1);
    return courses.isValidCourse(1000000)
    .then(result => {
      expect(result).toBe(false)
    })
  })

  test('should be able to combine lectures and discussions into one array that alternates', () => {
    let lectures = Array(5).fill(0);
    let discussions = Array(5).fill(1);

    let combined = courses.combineArrs(discussions, lectures);
    
    expect(combined.length === 10).toBe(true);
    
    let lastCourse = combined[0];
    let successiveLectures = 0;
    let alternatesLecturesWithDiscussions = true;
    for (let i = 1; i < combined.length; i++) {
      let currentCourse = combined[i];
      if (currentCourse  === 0) {
        successiveLectures++;
      } else {
        successiveLectures = 0;
      }

      if (successiveLectures >= 3) {
        alternatesLecturesWithDiscussions = false;
        break;
      }
    }

    expect(alternatesLecturesWithDiscussions).toBe(true);
  })
})

