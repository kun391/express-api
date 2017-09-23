'use strict'

import _ from 'lodash'
import nodeReq from 'node-req'
import Macroable from 'macroable'

/**
 * A facade over Node.js HTTP `req` object, making it
 * easier and simpler to access request information.
 * You can access the original **req** object as
 * `request.request`
 * @class Request
 * @constructor
 */
class Request extends Macroable {
  constructor (request) {
    super()
    /**
     * Refrence to native HTTP request object
     *
     * @attribute request
     * @type {Object}
     */
    this._request = request
  }

  /**
   * Request body
   *
   * @method body
   *
   * @return {Object}
   */
  get body () {
    return this._request.body || {}
  }

  /**
   * Returns query params from HTTP url.
   *
   * @method get
   *
   * @return {Object}
   *
   * @example
   * ```js
   * request.get()
   * ```
   */
  get () {
    return nodeReq.get(this._request)
  }

  /**
   * Returns an object of request body. This method
   * does not parses the request body and instead
   * depends upon the body parser middleware
   * to set the private `_body` property.
   *
   * No it's not against the law of programming, since AdonisJs
   * by default is shipped with body parser middleware.
   *
   * @method post
   *
   * @return {Object}
   *
   * @example
   * ```js
   * request.body()
   * ```
   */
  post () {
    return this._request.body
  }

  /**
   * Returns an object after merging {{#crossLink "Request/get"}}{{/crossLink}} and
   * {{#crossLink "Request/post"}}{{/crossLink}} values
   *
   * @method all
   *
   * @return {Object}
   *
   * @example
   * ```js
   * request.all()
   * ```
   */
  all () {
    return _.merge(this.get(), this.post())
  }

  /**
   * Returns an array of key/value pairs for the defined keys.
   * This method is super helpful when your HTML forms sends
   * an array of values and you want them as individual
   * objects to be saved directly via Lucid models.
   *
   * # Note
   * This method always returns a stable array by setting value for
   * `undefined` keys to `null`. For example your data payload has
   * 3 emails and 2 usernames, the final array will have 3
   * objects with all the emails and the last object will
   * have `username` set to `null`.
   *
   * @method collect
   *
   * @param  {Array} keys
   *
   * @return {Array}
   *
   * @example
   * ```js
   * // data {username: ['virk', 'nikk'], age: [26, 25]}
   * const users = request.collect(['username', 'age'])
   * // returns [{username: 'virk', age: 26}, {username: 'nikk', age: 25}]
   * ```
   */
  collect (keys) {
    /**
     * Making sure to wrap strings as an array.
     */
    const selectedValues = _(this.only(keys)).values().map((value) => {
      return Array.isArray(value) ? value : [value]
    }).value()

    const values = _.zip.apply(_, selectedValues)

    return _.map(values, (item, index) => {
      return _.transform(keys, (result, k, i) => {
        result[keys[i]] = item[i] || null
        return result
      }, {})
    })
  }

  /**
   * Returns the value from the request body or
   * query string, but only for a single key.
   *
   * @method input
   *
   * @param {String} key
   * @param {Mixed}  [defaultValue]
   *
   * @return {Mixed} Actual value or the default value falling back to `null`
   */
  input (key, defaultValue) {
    return _.get(this.all(), key, defaultValue)
  }

  /**
   * Returns everything from request body and query
   * string except the given keys.
   *
   * @param {Array} keys
   *
   * @method except
   *
   * @return {Object}
   *
   * @example
   * ```js
   * request.except(['username', 'age'])
   * ```
   */
  except (keys) {
    return _.omit(this.all(), keys)
  }

  /**
   * Returns value for only given keys.
   *
   * @method only
   *
   * @param  {Array} keys
   *
   * @return {Object}
   *
   * @example
   * ```js
   * request.only(['username', 'age'])
   * ```
   */
  only (keys) {
    return _.pick(this.all(), keys)
  }

  /**
   * Returns the intended method for HTTP request. This method
   * is useful when you have method spoofing enabled and wants
   * the actual request method.
   *
   * @method intended
   *
   * @return {String} Request method always in uppercase
   */
  intended () {
    return nodeReq.method(this._request)
  }

  /**
   * Returns HTTP request headers.
   *
   * @method headers
   *
   * @return {Object}
   */
  headers () {
    return nodeReq.headers(this._request)
  }

  /**
   * Returns header value for a given key.
   *
   * @method header
   *
   * @param  {String} key
   * @param  {Mixed} [defaultValue]
   *
   * @return {Mixed} Actual value or the default value, falling back to `null`
   */
  header (key, defaultValue) {
    return nodeReq.header(this._request, key) || defaultValue
  }

  /**
   * Returns url without query string for the HTTP request.
   *
   * @method url
   *
   * @return {String}
   */
  url () {
    return nodeReq.url(this._request)
  }

  /**
   * Returns originalUrl for the HTTP request.
   *
   * @method originalUrl
   *
   * @return {String}
   */
  originalUrl () {
    return nodeReq.originalUrl(this._request)
  }

  /**
   * Check the request body type based upon http
   * `Content-type` header.
   *
   * @method is
   *
   * @param  {Array}  [types]
   *
   * @return {String}
   *
   * @example
   * ```js
   * // request.headers.content-type = 'application/json'
   *
   * request.is(['json']) // json
   * request.is(['json', 'html']) // json
   * request.is(['application/*']) // application/json
   *
   * request.is(['html']) // '<empty string>'
   * ```
   */
  is (types) {
    return nodeReq.is(this._request, types)
  }

  /**
   * Returns the best accepted response type based from
   * the `Accept` header. If no `types` are provided
   * the return value will be array containing all
   * the `Accept` header values.
   *
   * @method accepts
   *
   * @param  {Array} [types]
   *
   * @return {String|Array}
   */
  accepts (types) {
    return nodeReq.accepts(this._request, types) || ''
  }

  /**
   * Similar to `accepts`, but always returns an array of
   * values from `Accept` header, starting from most
   * preferred from least.
   *
   * @method types
   *
   * @return {Array}
   */
  types () {
    return nodeReq.types(this._request)
  }

  /**
   * Returns request language based upon HTTP `Accept-Language`
   * header. This method will filter from the list of
   * acceptedLanguages array.
   *
   * @method language
   *
   * @param  {Array} [acceptedLanguages]
   *
   * @return {String}
   */
  language (acceptedLanguages) {
    return nodeReq.language(this._request, acceptedLanguages)
  }

  /**
   * Returns an array of request languages based on HTTP `Accept-Language`
   * header.
   *
   * @method languages
   *
   * @return {Array}
   */
  languages () {
    return nodeReq.languages(this._request)
  }

  /**
   * Returns a boolean indicating whether request has
   * body or not
   *
   * @method hasBody
   *
   * @return {Boolean}
   */
  hasBody () {
    return nodeReq.hasBody(this._request)
  }
}

/**
 * Defining _macros and _getters property
 * for Macroable class
 *
 * @type {Object}
 */
Request._macros = {}
Request._getters = {}

module.exports = Request
