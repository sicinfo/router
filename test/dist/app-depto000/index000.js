/**
 * 
 */
'use strict';

const { Router } = require('sicinfo-router')(__filename);

module.exports = class extends Router {

  constructor(/** @type {any} */ arg) {
    super(arg);

    this.send('test')
  }

}