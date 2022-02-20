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

  /** 
   * @param {unknown} [options]
   * @return {Promise<RouterResponse>}
   */
  doGet(options) {
    return this.id ? this.doGetById(this.id, options) :
      this.doc ? this.doGetByDoc(this.doc, options) :
        this.doGetByQuery(options);
  }

  /**
   * @param {string} id
   * @param {unknown} [options]
   * @return {Promise<RouterResponse>} 
   */
  doGetById(id, options) {
    throw new MethodNotAllowed('Method GetById Not Allowed');
  }

  /**
   * @param {Record<string,string>} doc
   * @param {unknown} [options]
   * @return {Promise<RouterResponse>} 
   */
  doGetByDoc(doc, options) {
    throw new MethodNotAllowed('Method GetByDoc Not Allowed');
  }

  /** 
   * @param {unknown} [options]
   * @return {Promise<RouterResponse>}
   */
  doGetByQuery(options) {
    throw new MethodNotAllowed('Method GetByQuery Not Allowed');
  }

  /** 
 * @param {unknown} [options]
 * @return {Promise<RouterResponse>}
 */
  doOptions(options) {
    throw new MethodNotAllowed('Method Options Not Allowed');
  }

  /** 
   * @param {unknown} [options]
   * @return {Promise<RouterResponse>}
   */
  doDelete(options) {
    throw new MethodNotAllowed('Method Delete Not Allowed');
  }

  /** 
 * @param {unknown} [options]
 * @return {Promise<RouterResponse>}
 */
  doPatch(options) {
    throw new MethodNotAllowed('Method Patch Not Allowed');
  }

  /** 
 * @param {unknown} [options]
 * @return {Promise<RouterResponse>}
 */
  doPost(options) {
    throw new MethodNotAllowed('Method Post Not Allowed');
  }

  /** 
 * @param {unknown} [options]
 * @return {Promise<RouterResponse>}
 */
  doPut(options) {
    throw new MethodNotAllowed('Method Put Not Allowed');
  }

  get id() {
    return this.router.url[1];
  }

  get doc() {
    return undefined;
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