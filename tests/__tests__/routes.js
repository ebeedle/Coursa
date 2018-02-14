var request = require('request');
const express = require('express');
const app = require('../../server/app.js');
let server;
const port = 8000;
const { courses, users } = require('../../server/models');
const db = require('../../server/db');

beforeAll((done) => {
  server = app.listen(port, done)
})

afterAll(() => {
  server.close();
})
 
describe('/login', function() {
  it('sends 200 status code on successful login', done => {
    const options = {
      'method': 'POST',
      'uri': `http://127.0.0.1:${port}/login`,
      'json': {
        'username': 'j@j',
        'password': 'j'
      }
    }
    request(options, (err, res, body) => {
      // console.log('headers :', res.statusCode)
      expect(res.statusCode).toBe(200);
      done();
    })
  })
  it('sends a 401 status code on unsuccessful login', done => {
    const options = {
      'method': 'POST',
      'uri': `http://127.0.0.1:${port}/login`,
      'json': {
        'username': 'wrongEmail@wrongEmail.wrong',
        'password': 'wrongpassword'
      }
    }
    request(options, (err, res, body) => {
      expect(res.statusCode).toBe(401);
      done();
    })
  })
});
describe('/signup', () => {
  const username = 'abcdefg';
  it('should successfully be able to sign a user up', done => {
    const options = {
      'method': 'POST',
      'uri': `http://127.0.0.1:${port}/signup`,
      'json': {
        'username': username,
        'password': 'abcdefg',
        'number': '1234567890'
      }
    }

    request(options, (err, res, body) => {
      db.query(`select * from users where email = '${username}'`, (err, data) => {
        expect(data.length > 0).toBe(true);
        // console.log('data :', data);
        users.delete({email: username})
        .then(() => {
          done();
        })
      })
    })
  })

  it('should not sign a user up if their email is already in the db', done => {
    const email = 'jjjjj@jjjjj';
    users.create({email: email })
    .then(() => {
      const options = {
        'method': 'POST',
        'uri': `http://127.0.0.1:${port}/signup`,
        'json': {
          'username': email,
          'password': 'password',
          'number': '1234567890'
        }
      }

      request(options, (err, res, body) => {
        expect(res.statusCode).toBe(400);
        users.delete({ email: email })
        .then(() => {
          done();
        })
        .catch(e => console.log(e))
      })
    })
    .catch(e => console.log(e))
  })
})