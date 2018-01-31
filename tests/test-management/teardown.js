const { testFunctions } = require('../../server/models')

module.exports = async function() {

  console.log('tearing down')
  await testFunctions.deleteSeedCoursesForTesting()
}