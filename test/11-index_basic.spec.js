/**
 * https://www.chaijs.com/api/
 * https://dev.to/lucifer1004/test-driven-development-of-an-http-server-with-koajs-25b8
 * 
 * https://www.chaijs.com/plugins/chai-http/
 */
'use strict';

const chai = require("chai");
require('mocha-sinon');

const { expect } = chai;

describe("SicinfoRouter - Basic suite test (development)", () => {
  const Index = require('../src/index')

  beforeEach(function () {
    this.sinon.stub(console, 'log');
  });

  it('Should be a function', () => {
    expect(typeof (Index)).to.equal('function', 'first');
    expect(typeof (Index().logging)).to.equal('function', 'second');
  })

  it('Should be the message', function () {
    const sicinfoRouter = Index(__filename);
    //@ts-ignore
    expect(console.log.calledOnce).to.be.true;
    //@ts-ignore
    expect(console.log.calledWith(`Loading... ${__filename}`)).to.be.true;
  })

  it(`Should be ContentType = 'content-type'`, () => {
    expect(Index().ContentType).to.equal('content-type')
  })

  it(`Should be TypeTextPlain = 'text/plain; charset=utf-8'`, () => {
    expect(Index().TypeTextPlain).to.equal('text/plain; charset=utf-8')
  })

  it(`Should be TypeApplicationJson = 'application/json; charset=utf-8'`, () => {
    expect(Index().TypeApplicationJson).to.equal('application/json; charset=utf-8')
  })

  it(`Should be TypeApplicationJson = 'application/json; charset=utf-8'`, () => {
    expect(Index().TypeApplicationJson).to.equal('application/json; charset=utf-8')
  })

  it(`Should be ContentTypeTextPlain = ['content-type','text/plain; charset=utf-8']`, () => {
    expect(Index().ContentTypeTextPlain)
      .to.be.an('array').to.include.ordered.members(['content-type', 'text/plain; charset=utf-8']);
  })

  it(`Should be ContentTypeApplicationJson = ['content-type','application/json; charset=utf-8']`, () => {
    expect(Index().ContentTypeApplicationJson)
      .to.be.an('array').to.include.ordered.members(['content-type', 'application/json; charset=utf-8']);
  })

  it(`Should have a property Auth`, () => {
    expect(Index()).to.have.property('Auth')
  })

  it(`Should have a property Router`, () => {
    expect(Index()).to.have.property('Router')
  })

  it(`Should have a property Service`, () => {
    expect(Index()).to.have.property('Service')
  })

  it(`Should have a property etc`, () => {
    expect(Index()).to.have.property('etc')
  })

})