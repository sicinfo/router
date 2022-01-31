
/** @typedef { import('jsonwebtoken').SignOptions } SignOpts */
/** @typedef { import('http').IncomingHttpHeaders } IncomingHttpHeaders */
/** @typedef { import('http').Server } HttpServer */
/** @typedef { import('querystring').ParsedUrlQuery } ParsedUrlQuery */

/**
 * @typedef Auth
 * @property { (a:SignArgs) => string } renew
 * @property { (a:SignArgs, b:SignOpts) => string } create
 * @property { (a:IncomingHttpHeaders, b?:boolean) => Promise<Token> } validate
 * @property { string } Authorization
 * @property { string } secret
 * @property { string } Bearer
 */ /**
 * @typedef SignArgs
 * @property { string= } iss
 * @property { string= } sub
 * @property { string= } jti
 * @property { (string | string[])= } aud
 * @property { number= } exp
 * @property { number= } nbf
 * @property { number= } iat
 * @property { number= } stp
 * @property { number= } cnt
 * @property { string= } name
 * @property { string= } api
 */ /**
 * @typedef Token
 * @property { string= } iss
 * @property { string= } sub
 * @property { string= } jti
 * @property { (string | string[])= } aud
 * @property { number= } exp
 * @property { number= } nbf
 * @property { number= } iat
 * @property { string= } name
 * @property { string= } api
 */ /**
 * @typedef AuthError
 * @property { number } code
 * @property { string } message
 * @property { number= } expiredAt
 */

/** @typedef {string|string[]|number|boolean|Date|null|undefined} AttributesTypes */
/** @typedef {Record<string, AttributesTypes>} Attributes */

/** @typedef {import('../src/router')} Router */
/** @typedef {import('../src/service')} Service */

/**
 * @typedef Ctx
 * @property {string} appname
 * @property {string} etc
 * @property {string} NODE_ENV
 * @property {import('http').IncomingMessage} [req]
 * @property {import('http').ServerResponse} [res]
 * @property {string[]} [url]
 * @property {string} [dirname]
 * @property {Service} [Service]
 */ 

/**
 * @typedef RouterResponse
 * @property { number } [status]
 * @property { Attributes|string } [data]
 * @property { Attributes|string } [message]
 * @property { import('http').OutgoingHttpHeaders } [headers]
 */ 

/** 
 * @typedef GateEnv
 * @property {string} [cwd]
 * @property {string} [PWD]
 * @property {string} [PORT]
 * @property {string} [watch='dist']
 * @property {string} [name='']
 * @property {string} [etc='etc']
 * @property {string} [dirname='']
 * @property {boolean} [test=false]
 * @property {HttpServer} [server]
 * @property {Record<string,string>} [cfgs={}]
 * @property {string} [NODE_ENV='development']
 * @property {(...a:[...any]) => void } [logging]
 */ 

  /** 
   * @typedef RouterOptions
   * @property { Attributes } [body]
   * @property { string } dirservices
   * @property { Record<string, any> } req
   * @property { Record<string, any> } res
   * @property { Service } [service]
   * @property { Service } [Service]
   * @property { Token } [authorization]
   * @property { IncomingHttpHeaders } [headers]
   * @property { ParsedUrlQuery } [query]
   */ 
