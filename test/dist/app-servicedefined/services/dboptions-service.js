/**
 * 
 */
'use strict';

const { Service, logging } = require('sicinfo-router')(__filename)

const fileJson = require('path').join(__dirname, '..', '..', '..', 'etc', 'db-servicedefined.json');
const dboptions = JSON.parse(require('fs').readFileSync(fileJson).toString())

module.exports = class extends Service {

  doGet() {    
    return Promise.resolve({ data: dboptions })
  }

}