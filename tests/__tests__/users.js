const { testFunctions, users } = require('../../server/models')


beforeAll(done => {
  return testFunctions.deleteUser('testtest', '9999999999')
    .then(() => {
      done();
    })
    .catch(e => {
      console.log('e')
      done();
    })
})

afterAll(done => {
  return testFunctions.deleteUser('testtest', '9999999999')
  .then(() => {
    done();
  })
  .catch(e => {
    console.log('e');
    done();
  })
})

describe('users', () => {

  describe('handleSignup', () => {
    test('should successfully sign up a user', done => {
      return users.handleSignup('testtest', 'test', '9999999999')
      .then(() => {
        return users.get({email: 'testtest', phone: '9999999999'})
      })
      .then((users) => {
        expect(users.length).toBe(1);
        done();
      })
      .catch((e => {
        console.log('e :', e);
        done();
      }))
    })
  })
})
