'use strict'
var chai = require('chai');
var expect = chai.expect; // using the "expect" style of Chai

var app = require('./../server.js');

const tap = require('tap')
const nock = require('nock')
const http = require('http')
const request = require('request')

tap.test('basic initialization', (t) => {
  let bot

  t.doesNotThrow(() => { bot = new Bot({ token: 'aidera' }) }, 'creating bot does not throw')
  t.type(bot, 'object', 'bot class is initiated correctly')
  t.equals(bot.token, 'aidera', 'bot token is stored correctly')
  t.type(bot.middleware, 'function', 'bot.middleware is a function')
  t.type(bot.getProfile, 'function', 'bot.getProfile is a function')
  t.end()
})

tap.test('missing token paramater', (t) => {
  t.throws(() => new Bot(), 'bot without token specified should throw')
  t.end()
})

tap.test('middleware runs', (t) => {
  let bot = new Bot({
    token: 'aidera'
  })

  let server = http.createServer(bot.middleware()).listen(0, () => {
    let address = server.address()

    request.get(`http://localhost:${address.port}/_status`, (err, res, body) => {
      t.error(err, 'should not error')

      t.deepEquals(JSON.parse(body), { status: 'ok' }, 'status endpoint should return ok')

      t.tearDown(() => {
        server.close()
      })
      t.end()
    })
  })
})

tap.test('debug works', (t) => {
  let bot = new Bot({
    token: 'aidera',
    debug: 'all'
  })

  let payload = {
    recipient: { id: 1 },
    message: { text: 'hello!' }
  }

  let response = {
    recipient_id: '1008372609250235',
    message_id: 'mid.1456970487936:c34767dfe57ee6e339',
    __debug__: {}
  }

  nock('https://graph.facebook.com').post('/v2.6/me/messages', payload).query({
    access_token: 'aidera',
    debug: 'all'
  }).reply(200, response)

  return bot.sendMessage(1, payload.message, (err, body) => {
    t.error(err, 'response should not be error')
    t.deepEquals(body, response, 'response is correct')
    t.end()
  }).catch(t.threw)
})