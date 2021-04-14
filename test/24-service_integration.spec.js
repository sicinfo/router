/**
 * https://www.chaijs.com/api/
 * https://dev.to/lucifer1004/test-driven-development-of-an-http-server-with-koajs-25b8
 * 
 * https://www.chaijs.com/plugins/chai-http/
 */
'use strict';

const chai = require("chai");
chai.use(require('chai-http'));

const { expect } = chai;

const { server } = require('../src/gate')({ test: true });

const req = chai.request(server).keepOpen();

describe("Integration Service - suite test", () => {
  
  after(() => req.close())

  describe("Get methods", () => {

  
      it(`#GET / `, done => {
      req.get('/').then(({ status, text }) => {
        expect(status).to.equal(400, 'status');
        expect(text).to.equal('App undefined', 'text');
        done();
      }).catch(done);

    })

  })

})
  