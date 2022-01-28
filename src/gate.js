/**
 * module: router
 * 
 * powered by moreira - 2020-11-21
 * 
 */
/* eslint-env: es2020 */
/** 
 * @typedef GateEnv
 * @property {string} [cwd]
 * @property {string} [PWD]
 * @property {string} [PORT]
 * @property {string} [watch]
 * @property {string} [name='']
 * @property {string} [etc='etc']
 * @property {string} [dirname='']
 * @property {boolean} [test=false]
 * @property {Http.Server} [server]
 * @property {Record<string,string>} [cfgs={}]
 * @property {string} [NODE_ENV='development']
 * @property {(...a:[...any]) => void } [logging]
 */ 
'use strict';

const { join } = require('path')
const { readFileSync, statSync } = require('fs');

const Http = require('http');

const { 
  BadRequest, 
  NotFound, 
  InternalServerError, 
  isHttpError 
} = require('http-errors');

/** @return {GateEnv} */
module.exports = (
  /** @type {GateEnv} */ {
    NODE_ENV = 'development',
    name = '',
    cwd = '',
    etc = '',
    dirname = '',
    cfgs = {},
    PORT, PWD,
    watch = "dist",
    server,
    test
  },
  /** @type { function } */ logging
) => {

  NODE_ENV = NODE_ENV.slice(0, 4)

  if (!cwd) cwd = PWD || __dirname
  if (!etc) etc = cwd;
  if (!dirname) dirname = cwd;
  if (!logging) logging = (/** @type {...any} */ ...a) => { NODE_ENV !== 'prod' && console.info(...a) }

  if (!server) server = Http.createServer((req, res) => {
    //@ts-ignore
    logging(`-> ${name}: ${new Date().toISOString()} - HTTP ${req.method} ${req.url}`)

    new Promise((resolve, reject) => {
      
      const [appname, ...url] = (req?.url || '').split('?')[0].replace(/^\/*|\/$/g, '').split('/');
      if (!appname) return reject(new BadRequest('App undefined'));
      if (/\./.test(appname)) return res.writeHead(204).end();
      
      const _dirname = join(dirname, watch.split(',')[0], `app-${appname}`);
      const appjson = join(etc, `app-${appname}.json`);

      if (!cfgs[appjson]) try {

        const stats = statSync(appjson);
        if (!stats.isFile() || stats.size < 12) {
          return reject(new BadRequest('App bad formatted'))
        }

        cfgs[appjson] = Reflect.get(JSON.parse(readFileSync(appjson, { encoding: 'utf8' })), 'main')
        if (!cfgs[appjson]) {
          return reject(new BadRequest('Main undefined'))
        }

      } catch (/** @type {any} */ err) {
        return reject(
          err.code === 'ENOENT' ?
            new NotFound('Main not found') :
            err instanceof SyntaxError ?
              new BadRequest('Main bad formatted') :
              err
        )
      }
      
      resolve([cfgs[appjson], _dirname, url, appname])
    }).then(([main, dirname, url, appname]) => {
      try { 
        new (require(join(dirname, main)))({ 
          req, 
          res, 
          cwd, 
          etc, 
          appname, 
          dirname, 
          url, 
          NODE_ENV 
        });
      }
      catch (/** @type { any } */ err) {
        logging('constructor', err.stack || err);
        throw err.code === 'MODULE_NOT_FOUND' ?
          new NotFound('Service not found') :
          err;
      }
    }).catch(err => {
      if (!isHttpError(err)) {
        err = new InternalServerError(err.message);
      }
      res.statusCode = err.statusCode || err.status;
      res.end(`${err.message || err}`);
    })
  })

  return {
    name, 
    cwd, 
    etc, 
    dirname, 
    cfgs, 
    PORT, 
    test, 
    NODE_ENV,
    server: test ? server : server?.listen(
      PORT, NODE_ENV === 'prod' ? undefined :
      /** @this import('net').Server */ function () {
        const { address, port } = /** @type {*} */ (this.address());
        const lns = [
          `${process.title.split(' ')[0]} ${process.version}`,
          `${new Date().toISOString()}: Listening: (${NODE_ENV})`,
          `-> ${address}:${port}${cwd}`,
          '\n.'.repeat(0)
        ];

        //@ts-ignore
        logging(
          ['-'.repeat(1 * lns.reduce((a, b) => Math.max(a, b.length), 0)), ...lns].join('\n')
        );
      }
    )
  }

}