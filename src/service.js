/** 
 * module: gate 
 * 
 * powered by moreira 2020-11-21
 */
'use strict';

const { logging } = require('./index')(__filename);

const { 
  MethodNotAllowed, 
  InternalServerError 
} = require('http-errors');

module.exports = class Service {

  /** @arg { Router } router*/
  constructor(router) {
    /** @private */ this.router = router;
  }

  get requiredAuthorization() {
    return false;
  }

  /** @return {Promise<RouterResponse>} */
  doHttp(/** @type {unknown} */ options) {
    return this.router.isGetMethod ? this.doGet(options) :
      this.router.isPostMethod ? this.doPost(options) :
        this.router.isPatchMethod ? this.doPatch(options) :
          this.router.isPutMethod ? this.doPut(options) :
            this.router.isDeleteMethod ? this.doDelete(options) :
              this.router.isOptionsMethod ? this.doOptions(options) :
                Promise.reject(new MethodNotAllowed());
  }

  /** @return { Promise<RouterResponse> } */
  doGet(/** @type {unknown} */ options) {
    return this.id ? this.doGetById(options) :
      this.doc ? this.doGetByDoc(options) :
        this.doGetByQuery(options);
  }

  /** @return {Promise<RouterResponse>} */
  doGetById(/** @type {unknown} */ options) {
    throw new MethodNotAllowed('Method GetById Not Allowed');
  }

  /** @return {Promise<RouterResponse>} */
  doGetByDoc(/** @type {unknown} */ options) {
    throw new MethodNotAllowed('Method GetByDoc Not Allowed');
  }

  /** @return {Promise<RouterResponse>} */
  doGetByQuery(/** @type {unknown} */ options) {
    throw new MethodNotAllowed('Method GetByQuery Not Allowed');
  }

  /** @return {Promise<RouterResponse>} */
  doOptions(/** @type {unknown} */ options) {
    throw new MethodNotAllowed('Method Options Not Allowed');
  }

  /** @return {Promise<RouterResponse>} */
  doDelete(/** @type {unknown} */ options) {
    throw new MethodNotAllowed('Method Delete Not Allowed');
  }

  /** @return {Promise<RouterResponse>} */
  doPatch(/** @type {unknown} */ options) {
    throw new MethodNotAllowed('Method Patch Not Allowed');
  }

  /** @return {Promise<RouterResponse>} */
  doPost(/** @type {unknown} */ options) {
    throw new MethodNotAllowed('Method Post Not Allowed');
  }

  /** @return {Promise<RouterResponse>} */
  doPut(/** @type {unknown} */ options) {
    throw new MethodNotAllowed('Method Put Not Allowed');
  }

  get id() {
    return this.router.url[1];
  }

  get doc() {
    return false;
    // return this.router[this.router.isPatchOrPostOrPutMethod ? 'body' : 'query']?.doc$;
  }

  get name() { 
    return this.router.url[0] 
  }

  get body() { 
    return this.router.body 
  }

  get query() { 
    return this.router.query 
  }

  get isAuthorized() { 
    return this.router.isAuthorized 
  }
  
}