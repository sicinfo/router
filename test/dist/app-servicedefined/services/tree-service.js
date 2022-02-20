/**
 * 
 */
'use strict';

const { Service } = require('sicinfo-router')(__filename)

module.exports = class extends Service {

  doGet() {
    return Promise.resolve({ data: this.query })
  }

  doPost() {
    return Promise.resolve({ data: this.body })
  }
}