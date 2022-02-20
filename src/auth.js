/**
 * application gate
 * 
 * powered by Moreira in 2019-01-30
 */
'use strict'

const Bearer = 'Bearer';
const Authorization = 'authorization';
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');
const expiresIn = 60 * 60; // 1 hora
const JwtSecret = process.env.JWT_SECRET || `${process.env.username}${process.env.HOSTNAME}`

/**
 * @arg { SignArgs } arg
 * @arg { SignOpts } opts
 * @this { Auth }
 */
const _sign = function(arg, opts = {}) {
  const { Bearer, secret } = this;
  // if (opts.algorithm === undefined) opts.algorithm = 'HS256'
  return `${Bearer} ${jwt.sign(arg, secret, opts)}`
}

module.exports =  class {

  /** 
   * @arg { IncomingHttpHeaders } headers
   */
  static verify(headers) {

    const [type, token] = headers.authorization?.split(' ') || [];

    return new Promise((resolve, reject) => {

      if (!type || type !== Bearer || !token) {
        reject(new Unauthorized('jwt invalid'))
      } else jwt.verify(token, this.secret, {}, (err, decoded) => {
        if (err) reject(new Unauthorized(err.message));
        else resolve(decoded);
      });

    })
  }

  /**
   * @arg { IncomingHttpHeaders } [arg0={}]
   * @return { Promise<Token> }
   */
  static validate({ authorization = '' }, requiredAuthorization = false) {

    return new Promise((resolve, reject) => {

      const [type, token] = authorization.split(' ');

      if (!type || type !== Bearer || !token) {
        return requiredAuthorization ? reject(new Unauthorized()) : resolve({})
      }
      
      jwt.verify(token, this.secret, {}, (err, decoded) => {
        if (!err) resolve(decoded || {})
        else if (requiredAuthorization) reject(new Unauthorized(err.message))
        else resolve({})
      });

    });
  }

  /**
   * @arg { SignArgs } arg
   * @arg { SignOpts } opts
   */
  static create(arg = {}, opts = {}) {

    if (undefined === opts.expiresIn) opts.expiresIn = expiresIn;
    if (undefined === arg.stp) arg.stp = 1 * (/** @type { number } */ (opts.expiresIn || 0));
    if (undefined === arg.cnt) arg.cnt = 0;

    return _sign.call(this, arg, opts);
  }

  /** 
   * @arg {SignArgs} arg
   */
  static renew(arg = {}) {

    arg.exp = (Date.now() / 1000 | 0) + (arg.stp || 0)
    arg.cnt = 1 + (arg.cnt || 0)

    return _sign.call(this, arg);
  }

  static get secret() { return JwtSecret }
  static get Authorization() { return Authorization }
  static get Bearer() { return Bearer }

};