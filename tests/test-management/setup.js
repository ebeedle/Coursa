console.log('seettign up environment (defining db in bob.js)')
const { testFunctions } = require('../../server/models')

module.exports = async function() {
  console.log('./setup.js setting up')

  await testFunctions.seedCoursesForTesting()
  // global.bobby = 'bobby!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
  // global.db = require('../../server/db/index.js');
  // if (!global.db.queryAsync) {
  //   global.db = Promise.promisifyAll(db);
  // } 
}