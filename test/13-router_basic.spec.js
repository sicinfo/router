/**
 * https://www.chaijs.com/api/
 * https://dev.to/lucifer1004/test-driven-development-of-an-http-server-with-koajs-25b8
 * 
 * https://www.chaijs.com/plugins/chai-http/
 */
'use strict';

const chai = require("chai");
const { expect } = chai;

const Router = require('../src/router');

describe("Basic Router - suite test", () => {

  const opts = {
    req: {
      method: 'GET',
      url: '/host/test'
    },
    res: {},
    cwd: 'cwd',
    etc: 'etc',
    appname: 'appname',
    dirname: 'dirname',
    url: ['test']
  }

  // const router = new Router(opts)
  
  it(`should be method = 'GET'`, done => {
    //@ts-ignore
    const router = new Router({ req: { method: 'GET' } });
    expect(router.method).to.equal('GET');
    expect(router.isGetMethod).to.be.true;
    expect(router.isPatchOrPostOrPutMethod).to.be.false;
    done();
  })

  it(`Should be method = 'PUT'`, done => {
    //@ts-ignore
    const router = new Router({ req: { method: 'PUT' } });
    expect(router.method).to.equal('PUT');
    expect(router.isPutMethod).to.be.true;
    expect(router.isPatchOrPostOrPutMethod).to.be.true;
    done();
  })
  
  it(`Should be method = 'POST'`, done => {
    //@ts-ignore
    const router = new Router({ req: { method: 'POST' } });
    expect(router.method).to.equal('POST');
    expect(router.isPostMethod).to.be.true;
    expect(router.isPatchOrPostOrPutMethod).to.be.true;
    done();
  })
  
  it(`Should be method = 'PATCH'`, done => {
    //@ts-ignore
    const router = new Router({ req: { method: 'PATCH' } });
    expect(router.method).to.equal('PATCH');
    expect(router.isPatchMethod).to.be.true;
    expect(router.isPatchOrPostOrPutMethod).to.be.true;
    done();
  })
  
  it(`Should be method = 'DELETE'`, done => {
    //@ts-ignore
    const router = new Router({ req: { method: 'DELETE' } });
    expect(router.method).to.equal('DELETE');
    expect(router.isDeleteMethod).to.be.true;
    expect(router.isPatchOrPostOrPutMethod).to.be.false;
    done();
  })

  it(`Should be method = 'OPTIONS'`, done => {
    //@ts-ignore
    const router = new Router({ req: { method: 'OPTIONS' } });
    expect(router.method).to.equal('OPTIONS');
    expect(router.isOptionsMethod).to.be.true;
    expect(router.isPatchOrPostOrPutMethod).to.be.false;
    done();
  })

  it(`Should be authorization and isAuthorization - false`, done => {
    //@ts-ignore
    const router = new Router({});
    expect(router.authorization).to.be.empty;
    expect(router.isAuthorized).to.be.false;
    done();
  })

  it(`Should be authorization and isAuthorization - true`, done => {
    //@ts-ignore
    const router = new Router({ authorization: { sub: 'sub', iss: 'iss', iat: 'iat', exp: 'exp' } });
    expect(router.isAuthorized).to.be.true;
    done();
  })

  it(`Should be dirname`, done => {
    //@ts-ignore
    const router = new Router({ dirname: 'dirname' });
    expect(router.dirname).to.equal('dirname');
    done();
  })

  it(`Should have dirservices`, done => {
    //@ts-ignore
    expect(new Router({}).dirservices).to.equal('services');
    done();
  })

  it(`Should be originalUrl`, done => {
    //@ts-ignore
    expect(new Router({}).originalUrl).to.equal('/');
    //@ts-ignore
    expect(new Router({ req: { url: '/a/b/c?d=1&c=2' } }).originalUrl).to.equal('/a/b/c?d=1&c=2');
    done();
  })

  it(`Should be url`, done => {
    //@ts-ignore
    expect(new Router({}).url).to.be.an('array').to.be.empty;
    //@ts-ignore
    expect(new Router({ url: ['a'] }).url).to.be.an('array').to.include('a');
    done();
  })

  it(`Should be headers`, done => {
    //@ts-ignore
    expect(new Router({}).headers).to.be.empty;
    //@ts-ignore
    expect(new Router({ headers: { a: 'a' } }).headers).to.include({ a: 'a' })
    //@ts-ignore
    expect(new Router({ req: { headers: { a: 'a' } } }).headers).to.include({ a: 'a' })
    done();
  })

  it(`Should be query`, done => {
    //@ts-ignore
    expect(new Router({}).query).to.be.undefined;
    //@ts-ignore
    expect(new Router({ query: { a: 'a' } }).query).to.include({ a: 'a' })
    //@ts-ignore
    expect(new Router({ req: { url: '/a?a=a' } }).query).to.include({ a: 'a' })
    done();
  })

  it(`Should be body`, done => {
    //@ts-ignore
    expect(new Router({}).body).to.be.undefined;
    //@ts-ignore
    expect(new Router({ body: { a: 'a' } }).body).to.include({ a: 'a' })
    // //@ts-ignore
    // expect(new Router({ req: { url: '/a?a=a' } }).query).to.include({ a: 'a' })
    done();
  })

  // it(`Should have DbOptions`, done => {

  //   const [host, username, password] = ['host', 'username', 'password']
  //   const dialect = { host, username, password }
  //   const database = { dialect }

  //   //@ts-ignore
  //   const router = new Router({ 
  //     etc: require('path').join(__dirname, 'etc'), 
  //     appname: 'basic' 
  //   });

  //   expect(JSON.stringify(router.DbOptions)).to.equal(JSON.stringify({ database }));
  //   done();
  // })

  it(`Should be NODE_ENV = 'deve`, done => {

        //@ts-ignore
    const router = new Router({ NODE_ENV: 'deve' });

    expect(router.NODE_ENV).to.equal('deve');
    done();
  })

})
