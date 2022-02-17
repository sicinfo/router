/**
 * module: gate
 * 
 * powered by moreira - 2020-11-21
 * 
 */
'use strict';

exports.ContentType = 'content-type';
exports.TypeTextPlain = 'text/plain; charset=utf-8';
exports.TypeApplicationJson = 'application/json; charset=utf-8';
exports.ContentTypeTextPlain = [exports.ContentType, exports.TypeTextPlain];
exports.ContentTypeApplicationJson = [exports.ContentType, exports.TypeApplicationJson];

Object.defineProperty(exports, 'Auth', { get: () => require('./auth') });
Object.defineProperty(exports, 'Router', { get: () => require('./router') });
Object.defineProperty(exports, 'Service', { get: () => require('./service') });

const logging = (process.env.NODE_ENV?.toLowerCase().slice(0, 4) === 'prod') ?
  (/** @type {string?} */ a) => (/** @type {[...any]} */ ...a) => exports :
  function(/** @type {string?} */ name) {
    return (/** @type {string|number} */ ind, /** @type {[...string]} */ ...args) => {
      if (name) {
        let _log = console.log;
        if (args.length == 1 && typeof (args[0]) === 'function') {
          try { 
            args = [args[0]()] 
          }
          catch (/** @type {any} */ err) { 
            _log = console.warn;
            args = Object.entries(err);
          }
        }
        _log([name].concat(args).map((c, i) => `${i ? '-' : ind} ${c}`).join('\n'));
      }
      return exports;
    }
  }

/** 
 * @param {GateEnv & NodeJS.ProcessEnv} GateEnv
 * @return {GateEnv} 
 */
const gate = ({
  NODE_ENV = 'development',
  name = '',
  cwd = '',
  etc = '',
  dirname = '',
  cfgs = {},
  PORT, PWD,
  watch = '',
  server,
  test = false,
  logging = (/** @type {...any} */ ...args) => { 
    NODE_ENV !== 'prod' && console.info(...args) 
  }
}) => {

  const Http = require('http');
  
  const {
    join: pathJoin
  } = require('path')
  
  const {
    readFileSync,
    statSync
  } = require('fs');
  
  const {
    BadRequest,
    NotFound,
    InternalServerError,
    isHttpError
  } = require('http-errors');

  NODE_ENV = NODE_ENV.slice(0, 4)
  if (!cwd) cwd = PWD || __dirname
  if (!etc) etc = cwd;
  if (!dirname) dirname = cwd;
  if (!watch) watch = pathJoin(dirname, 'dist');

  if (!server) server = Http.createServer((req, res) => {

    logging(`-> ${name}: ${new Date().toISOString()} - HTTP ${req.method} ${req.url}`);

    new Promise((resolve, reject) => {
      
      const [appname, ...url] = (req?.url || '').split('?')[0].replace(/^\/*|\/$/g, '').split('/');
      if (!appname) return reject(new BadRequest('App undefined'));
      if (/\./.test(appname)) return res.writeHead(204).end();
      
      const _dirname = pathJoin(watch.split(',')[0], `app-${appname}`);
      const appjson = pathJoin(etc, `app-${appname}.json`);

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
          err?.code === 'ENOENT' ?
            new NotFound('Main not found') :
            err instanceof SyntaxError ?
              new BadRequest('Main bad formatted') :
              err
        )
      }
      
      resolve([cfgs[appjson], _dirname, url, appname])
    }).then(([main, dirname, url, appname]) => {
      
      try { 
        
        new (require(pathJoin(dirname, main)))({  
          appname, 
          etc, 
          NODE_ENV ,
          req, 
          res, 
          url, 
          dirname, 
          cwd
        });

      } catch (/** @type { any } */ err) {
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
      PORT,
      NODE_ENV === 'prod' ?
        undefined :
        /** @this import('net').Server */
        function () {
          
          const { 
            address, port 
          } = /** @type {*} */ (this.address())

          const args = [
            `${process.title.split(' ')[0]} ${process.version}`,
            `${new Date().toISOString()}: Listening: (${NODE_ENV})`,
            `-> ${address}:${port}${cwd}`,
            '\n.'.repeat(0)
          ]

          const maxLength = 1 * args.reduce((a, b) => Math.max(a, b.length), 0)

          logging(['-'.repeat(maxLength), ...args].join('\n'));
        }
    )
  }
}

exports.gate = gate
exports.etc = gate(process.env)?.etc

/** 
 * @param {string} [name='']
 */
module.exports = function(name = '') {
  return (exports.logging = logging.call(this, name))('Loading...');
}

