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
  cwd: __dirname,
  NODE_ENV: 'test'
});

const req = chai.request(server).keepOpen();

describe("Integration Router - suite test", () => {

  after(() => { req.close() })

  it(`#GET /serviceundefined`, done => {
    req.get('/serviceundefined').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Service undefined');
      expect(res).to.have.status(400);
      done();
    })
  })

  it(`#GET /servicedefined/one`, done => {
    req.get('/servicedefined/one').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Service undefined');
      expect(res).to.have.status(400);
      done();
    })
  })

  it(`#OPTIONS /servicedefined/two`, done => {
    req.options('/servicedefined/two').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Method Options Not Allowed');
      expect(res).to.have.status(405);
      done();
    })
  })

  it(`#DELETE /servicedefined/two`, done => {
    req.delete('/servicedefined/two').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Method Delete Not Allowed');
      expect(res).to.have.status(405);
      done();
    })
  })

  it(`#PATCH /servicedefined/two`, done => {
    req.patch('/servicedefined/two').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Method Patch Not Allowed');
      expect(res).to.have.status(405);
      done();
    })
  })

  it(`#POST /servicedefined/two`, done => {
    req.post('/servicedefined/two').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Method Post Not Allowed');
      expect(res).to.have.status(405);
      done();
    })
  })

  it(`#PUT /servicedefined/two`, done => {
    req.put('/servicedefined/two').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Method Put Not Allowed');
      expect(res).to.have.status(405);
      done();
    })
  })

  it(`#GET /servicedefined/two`, done => {
    req.get('/servicedefined/two').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Method GetByQuery Not Allowed');
      expect(res).to.have.status(405);
      done();
    })
  })

  it(`#GET /servicedefined/two/1`, done => {
    req.get('/servicedefined/two/1').end((err, res) => {
      if (err) return done(err)
      expect(res.text).to.equal('Method GetById Not Allowed');
      expect(res).to.have.status(405);
      done();
    })
  })

  it(`#GET /servicedefined/tree`, done => {
    req.get('/servicedefined/tree')
      .query({ a: 'a'})
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.include({ a: 'a'})
        expect(res).to.have.status(200);
        done();
      })
  })

  it(`#POST /servicedefined/tree`, done => {
    req.post('/servicedefined/tree')
      .send({ a: 'a'})
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.include({ a: 'a'})
        expect(res).to.have.status(200);
        done();
      })
  })

  it(`Should have DbOptions`, done => {
    req.get('/servicedefined/dboptions')
      .end((err, res) => {
        if (err) return done(err)
        expect(res).to.have.status(200);
        expect(Object.keys(res.body)[0]).to.equal('database')
        expect(res.body?.database?.dialect?.username).to.equal('username')
        done();
      })
  })

})
