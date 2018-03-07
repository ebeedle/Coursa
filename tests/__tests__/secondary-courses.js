const { testFunctions, secondaryCourses } = require('../../server/models')

beforeAll((done) => {
  return testFunctions.deleteSeedSections()
  .then(() => {
    return testFunctions.seedSections()
  })
  .then(() => {
    done()
  })
  .catch(e => {
    console.log('error :', e)})
    done();
});

afterAll((done) => {
  return testFunctions.deleteSeedSections()
  .then(() => {
    done()
  })
  .catch(e => {
    console.log('error :', e)
    done();
  })
});

describe('secondary courses', () => {

  describe('getSectionsForCourse', () => {
    test('should retrieve correct discussion sections for desired lecture', (done) => {  
      return secondaryCourses.getSectionsForCourse(100000)
      .then(sections => {
        console.log('sections :', sections)
        expect(sections.length > 0).toBe(true);
        expect(sections[0].parent_id).toBe(100000);
        done()
      })
      .catch(e => console.log('e :', e))
    })
  })

  describe('trackedSections', () => {
    test('should retrive discussion sections that users rack', done => {
      return secondaryCourses.getTrackedSections('spring', 2018)
      .then(sections => {
        expect(sections.length >= 1).toBe(true);
        done();
      })
    })
  })
})
