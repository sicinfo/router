/**
 * https://www.chaijs.com/api/
 * https://dev.to/lucifer1004/test-driven-development-of-an-http-server-with-koajs-25b8
 * 
 * https://www.chaijs.com/plugins/chai-http/
 */
'use strict';

const chai = require("chai");
const { expect } = chai;

const args = {
  url: ['a', 'b'],
  NODE_ENV: 'test'
}

describe("Basic Service - suite test", () => {

  const Service = require('../src/service');
  const Router = require('../src/router');

  it(`Should have id undefined`, done => {
    //@ts-ignore
    expect(new Service(new Router({})).id).to.be.undefined;
    done();
  })

  it(`Should be id = ${args.url[1]}`, () => {
    //@ts-ignore
    expect(new Service(new Router(args)).id).to.equal(args.url[1])
  })

  it(`Should be name = ${args.url[0]}`, () => {
    //@ts-ignore
    expect(new Service(new Router(args)).name).to.equal(args.url[0])
  })

});