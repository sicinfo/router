/**
 * 
 */
'use strict';

const { Router } = require('sicinfo-router')(__filename);

module.exports = class extends Router {

  constructor(/** @type {any} */ ctx) {
    super(ctx);
    ctx.status = 204;
  }

}
