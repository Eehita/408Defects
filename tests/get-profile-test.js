'use strict'
var chai = require('chai');
var expect = chai.expect; // using the "expect" style of Chai

var app = require('./../server.js');

const tap = require('tap')
const nock = require('nock')

tap.test('bot.getProfile() - successful request', (t) => {
  let bot = new Bot({
    token: 'aidera'
  })

  let response = {
    first_name: 'John',
    last_name: 'Smith',
    profile_pic: 'url',
    locale: 'en',
    timezone: 'PST',
    gender: 'F'
  }

  nock('https://graph.facebook.com').get('/v2.6/1').query({
    fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
    access_token: 'foo'
  }).reply(200, response)

  return bot.getProfile(1, (err, profile) => {
    t.error(err, 'response should not be error')
    t.deepEquals(profile, response, 'response is correct')
    t.end()
  }).catch(t.threw)
})