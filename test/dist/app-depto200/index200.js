/**
 * 
 */
'use strict';

/** @typedef { import('sicinfo-router').Ctx } Ctx */

const { Router } = require('sicinfo-router')(__filename);

module.exports = class extends Router {

  /** @arg {Ctx} ctx */
  constructor(ctx) {
    super(ctx);

    ctx.status = 200;
    ctx.body = ctx.url.join('/') + '?' +
      Object.entries(ctx.query).map(([a, b]) => `${a}=${b}`).join(',')

  }

}