/** 
 * module: router 
 * 
 * powered by moreira 2020-11-21
 */
'use strict';

const { readFileSync } = require('fs');
const _statuses = require('statuses');
const { join: pathJoin } = require('path');
const qs = require('querystring');
const Auth = require('./auth');

const {
  BadRequest,
  NotFound,
  InternalServerError,
  isHttpError,
  ServiceUnavailable
} = require('http-errors');

const {
  ContentType,
  TypeTextPlain,
  TypeApplicationJson,
  logging
} = require('./index')(__filename);

const { empty: statusesEmpty } = _statuses;

const statuses = (/** @type {string} */ b) => {
  return 1 * /** @type {number} */ (_statuses(b));
}

const Router = module.exports = class {

  /** @arg { Ctx & RouterOptions? } ctx */
  constructor(ctx) {
    /** 
     * @readonly 
     * @private 
     */ 
    this.ctx = Object.assign({ req: {}, res: {} }, ctx);
   
    try {
      const service = new this.service(this);

      this.validate(
        !this.isOptionsMethod && this.headers || {},
        !this.isOptionsMethod && service.requiredAuthorization
      ).then(token => {
        this.ctx.authorization = token;
        return new Promise(resolve => {
          if (!this.isPatchOrPostOrPutMethod) resolve(null);
          else {
            let body = '';
            ctx.req?.setEncoding('utf8')
              .on('data', (/** @type {string} */ chunk) => { body += chunk })
              .on('end', () => { resolve(body ? JSON.parse(body) : {}) })
          }
        });
      }).then((/** @type {Attributes} */ data) => {
        this.ctx.body = data;
        return service.doHttp();
      }).then((arg = { status: 204 }) => {
        if (this.isAuthorized) Reflect.set(
          arg.headers || (arg.headers = {}),
          this.Auth.Authorization,
          this.Auth.renew(this.authorization)
        )
        this.send(arg);        
      }).catch(err => {
        this.send(err);
      })
    
    } catch (/** @type {any} */ err) {
      this.send(
        err.message === 'this.service is not a constructor' ?
          new BadRequest(`Service is not a constructor`) :
          err
      );
    }
  }

  get Auth() {
    return Auth
  }

  get authorization() {
    return this.ctx.authorization || {}
  }

  get isAuthorized() {
    const { sub, iss, iat, exp } = this.authorization;
    return !!(sub && iss && iat && exp);
  }

  /** 
   * @arg { IncomingHttpHeaders } headers }
   * @return { Promise<Token> } 
   */
  validate(headers, required = false) {
    return this.Auth.validate(headers, required)
  }

  /** 
   * @arg { RouterResponse | string } arg 
   */
  send(arg) {

    logging('send', arg && (
      (/** @type {any} */ (arg)).tracer ||
      JSON.stringify(arg)
    ));

    const { res } = this.ctx;
    if (!res.writeHead) return

    if (!arg) arg = new InternalServerError();
    const isError = isHttpError(arg);

    if (typeof (arg) === 'string') arg = isError ? { message: arg } : { data: arg };
    let { status = 0, data, message, headers = {} } = arg;
    const isString = [data, message].some(a => typeof (a) === 'string');

    if (!status) status = statuses(isError ? 'Bad Request' : !data ? 'No Content' : 'Ok')
    if (statusesEmpty[status]) [data, message] = [undefined, undefined]

    if (!!data && !headers[ContentType]) headers[ContentType] = isString ? TypeTextPlain : TypeApplicationJson;
    else if (!data && !!message) data = message;

    res.writeHead(status, headers);
    if (!data) res.end();
    else res.end(isString ? data : JSON.stringify(data));
  }

  get service() {
    return this.ctx.service || (this.ctx.service = this.ctx.Service || (() => {

      const url = this.url, _url = url.splice(0);
      let service;

      while (_url.length && !service) {
        const _name = _url.pop();
        if (!_name) continue;

        const dirServices = pathJoin(this.dirservices, ..._url);

        if (isNaN(parseInt(_name))) try { service = require(pathJoin(dirServices, `${_name}-service`)) }
          catch (err) {
            if (url[0]) try { service = require(pathJoin(dirServices, `${_name}-service`, `${url[0]}-service`)) }
              catch (err) { }
          }

        url.unshift(_name);
        // console.log(135, 'service\n', url, this.url);

      };

      if (service) return service;
      else throw new BadRequest('Service undefined')

    })());
  }

  get NODE_ENV() {
    return this.ctx.NODE_ENV
  }

  /** @return {string} */
  get dirname() {
    return this.ctx.dirname || '.'
  }

  get originalUrl() {
    return this.ctx.req.url || (this.ctx.req.url = '/')
  }

  get url() {
    return this.ctx.url || (this.ctx.url = [])
  }

  get dirservices() {
    return this.ctx.dirservices || (
      this.ctx.dirservices = pathJoin(this.dirname, 'services')
    )
  }

  get headers() {
    return this.ctx.headers || (
      this.ctx.headers = this.ctx.req.headers || {}
    )
  }

  get method() {
    return this.ctx.req.method || '';
  }

  get isGetMethod() {
    return this.method === 'GET'
  }

  get isPutMethod() {
    return this.method === 'PUT'
  }

  get isPostMethod() {
    return this.method === 'POST'
  }

  get isPatchMethod() {
    return this.method === 'PATCH'
  }

  get isDeleteMethod() {
    return this.method === 'DELETE'
  }

  get isOptionsMethod() {
    return this.method === 'OPTIONS'
  }

  get isPatchOrPostOrPutMethod() {
    return this.isPatchMethod || this.isPostMethod || this.isPutMethod
  }

  get query() {
    return this.ctx.query || (this.ctx.query = (a => {
      return a ? qs.parse(a) : undefined;
    })(this.originalUrl.split('?')[1]));
  }

  get body() { 
    return this.ctx.body;
  }

  /** @return { NodeJS.Dict<any> } */
  get DbOptions() {

logging('DbOptions------------------------',
  this.ctx.etc,
  `db-${this.ctx.appname}.json`
)    

    try {
      return JSON.parse(
        readFileSync(
          pathJoin(
            this.ctx.etc,
            `db-${this.ctx.appname}.json`
          )
        ).toString()
      )
    } 
    catch (e) { 
      return {} 
    }
  }

}










