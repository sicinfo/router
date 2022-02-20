/**
 * https://www.chaijs.com/api/
 * https://dev.to/lucifer1004/test-driven-development-of-an-http-server-with-koajs-25b8
 */
'use strict';

const { join } = require("path");
const chai = require("chai");

const { expect } = chai;

const Gate = require('../src/gate')

describe("Gate Basic - GetEnv", () => {

  const { name, PORT, cwd, etc, cfgs, dirname, test, NODE_ENV } = Gate(
    Object.assign({ name: 'test', PORT: 1, cwd: __dirname, test: true })
  );
  
  it(`Should be name = 'test'`, () => {
    expect(name).to.equal('test');
  })

  it(`Should be cwd = __dirname`, () => {
    expect(cwd).to.equal(__dirname);
  })

  it(`Should be etc = join(__dirname, 'etc')`, () => {
    expect(etc).to.equal(join(__dirname, 'etc'));
  })

  it(`Should be dirname = join(__dirname, 'dist')`, () => {
    expect(dirname).to.equal(join(__dirname, 'dist'));
  })

  it(`Should be cfgs = {}`, () => {
    expect(cfgs).to.be.an('object').to.be.empty;
  })

  it(`Should be PORT = 1`, () => {
    expect(PORT).to.equal(1);
  })

  it(`Should be test = true`, () => {
    expect(test).to.true;
  })

  it(`Should be NODE_ENV = deve`, () => {
    expect(NODE_ENV).to.equal('deve');
  })

});
