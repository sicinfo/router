/**
 * 
 */
'use strict';

module.exports = class {
  constructor(/** @type {any} */ ctx) {
    ctx.res.statusCode = 204;
    ctx.res.end();
  }
}

// module.exports = function depto(/** @type { import('../../typings').Ctx } */ ctx) {
//   if (!(this instanceof depto)) new depto(ctx);
//   ctx.status = 204
//   return this;
// }