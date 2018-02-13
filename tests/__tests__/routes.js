const request = require('supertest');
const express = require('express');
 
const app = require('../../server/app.js');
 
describe('home', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});