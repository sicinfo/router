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
        if (args.length == 1 && typeof (args[0]) === 'function')
          try { args = [args[0]()] }
          catch (err) { [_log, args] = [console.warn, Object.entries(err)] }
        _log([name].concat(args).map((c, i) => `${i ? '-' : ind} ${c}`).join('\n'));
      }
      return exports;
    }
  }

const { etc } = require('./gate')(process.env);

exports.etc = etc;

module.exports = function(/** @type {string?} */ name) {
  exports.logging = logging.call(this, name);
  return exports.logging('Loading...');
}
