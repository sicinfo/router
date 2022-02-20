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

const { server } = require('../src/gate')({ 
  test: true,
  cwd: __dirname
});

const req = chai.request(server).keepOpen();

describe("Integration Gate - suite test", () => {
  
  after(() => req.close())

  it(`#GET / `, done => {
    req.get('/')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).to.equal('App undefined', 'text');
        expect(res).to.have.status(400);
        done();
      })
  })

  it(`#GET /.favicon.ico`, done => {
    req.get('/.favicon.ico').then(({ status, text }) => {
      expect(status).to.equal(204)
      done();
    }).catch(done);
  })

  it(`#GET /mainnotfound`, done => {
    req.get('/mainnotfound').then(({ status, text }) => {
      expect(text).to.equal('Main not found', 'text');
      expect(status).to.equal(404, 'status');
      done();
    }).catch(done);
  })

  it(`#GET /appbadformatted`, done => {
    req.get('/appbadformatted').then(({ status, text }) => {
      expect(text).to.equal('App bad formatted', 'text');
      expect(status).to.equal(400, 'status');
      done();
    }).catch(done);
  })

  it(`#GET /mainbadformatted`, done => {
    req.get('/mainbadformatted').then(({ status, text }) => {
      expect(text).to.equal('Main bad formatted', 'text');
      expect(status).to.equal(400, 'status');
      done();
    }).catch(done);
  })

  it(`#GET /mainundefined`, done => {
    req.get('/mainundefined').then(({ status, text }) => {
      expect(text).to.equal('Main undefined', 'text');
      expect(status).to.equal(400, 'status');
      done();
    }).catch(done);
  })

  it(`#GET /servicenotfound`, done => {
    req.get('/servicenotfound')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.text).to.equal('Service not found', 'text');
          expect(res).to.have.status(404);
          done();
        }
      })
  })

})
