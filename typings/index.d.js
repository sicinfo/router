/** @typedef { import('jsonwebtoken').SignOptions } SignOpts */
/** @typedef { import('http').IncomingHttpHeaders } IncomingHttpHeaders */
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

/**
 * @typedef Ctx
 * @property {string} etc
 * @property {string[]} [url]
 * @property {string} appname
 * @property {string} [dirname]
 * @property {string} NODE_ENV
 * @property {import('../src/service')} [Service]
 * @property {import('http').ServerResponse} [res]
 * @property {import('http').IncomingMessage} [req]
 */ /**
 * @typedef RouterResponse
 * @property { number } [status]
 * @property { Attributes|string } [data]
 * @property { Attributes|string } [message]
 * @property { import('http').OutgoingHttpHeaders } [headers]
 */ 
