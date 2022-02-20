// /**
//  * https://www.chaijs.com/api/
//  * https://dev.to/lucifer1004/test-driven-development-of-an-http-server-with-koajs-25b8
//  */
// 'use strict';

// const chai = require("chai");
// chai.use(require('chai-http'));

// describe("Integration Index - suite test", () => {

//   const Index = require('sicinfo-router')(__filename);
  
// });



// // require('./gate_basic.spec');

// // const { join } = require("path");
// // const { expect } = chai;

// // const { server } = require('../src/gate')(
// //   Object.assign({ name: 'test', cwd: __dirname })
// // );

// // const req = chai.request(server).keepOpen();

// // const [NotContent, BadRequest, NotFound] = [204, 400, 404]

// // describe("Gate Integration - suite test", () => {

// //   after(() => {
// //     req.close();
// //     server?.close();
// //   });

// //   it(`should GET / - BadRequest`, done => {
// //     req.get('/').then(res => {
// //       expect(res).to.be.status(BadRequest);
// //       done();
// //     }).catch(done);
// //   })

// //   it(`should GET /deptonoexist - NotFound`, done => {
// //     req.get('/deptonoexist').then(res => {
// //       expect(res).to.be.status(NotFound);
// //       done();
// //     }).catch(done);
// //   })

// //   it(`should GET /deptoempty - BadRequest`, done => {
// //     req.get('/deptoempty').then(res => {
// //       expect(res).to.be.status(BadRequest);
// //       done();
// //     }).catch(done);
// //   })

// //   it(`should GET /deptoshort - BadRequest`, done => {
// //     req.get('/deptoshort').then(res => {
// //       expect(res).to.be.status(BadRequest);
// //       done();
// //     }).catch(done);
// //   })

// //   it(`should GET /deptoinvalid - BadRequest`, done => {
// //     req.get('/deptoinvalid').then(res => {
// //       expect(res).to.be.status(BadRequest);
// //       done();
// //     }).catch(done);
// //   })

// //   it(`should GET /deptomainundefined - BadRequest`, done => {
// //     req.get('/deptomainundefined').then(res => {
// //       expect(res).to.be.status(BadRequest);
// //       done();
// //     }).catch(done);
// //   })

// //   it(`should GET /deptonotfound`, done => {
// //     req.get('/deptonotfound').then(res => {
// //       expect(res).to.be.status(NotFound);
// //       done();
// //     }).catch(done);
// //   })

// //   it(`should GET /deptonotclass - NotFound`, done => {
// //     req.get('/deptonotclass').then(res => {
// //       expect(res).to.be.status(NotFound);
// //       done();
// //     }).catch(done);
// //   })

// //   it(`should GET /deptovalid - NoContent`, done => {
// //     req.get('/deptovalid').then(res => {
// //       expect(res).to.be.status(NotContent);
// //       done();
// //     }).catch(done);
// //   })


// // });