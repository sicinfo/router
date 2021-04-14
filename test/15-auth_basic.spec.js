/**
 * https://www.chaijs.com/api/
 * https://dev.to/lucifer1004/test-driven-development-of-an-http-server-with-koajs-25b8
 * 
 * https://www.chaijs.com/plugins/chai-http/
 */
'use strict';

const chai = require("chai");
const { expect } = chai;

Reflect.set(process.env, 'JWT_SECRET', 'A');

describe("Basic Auth - suite test", () => {

  const Auth = require('../src/auth');


});