'use strict'

import pathRegexp from 'path-to-regexp'

class Layer {
  constructor (path, options, fn) {
    var opts = options || {};

    this.handle = fn;
    this.name = fn.name || '<anonymous>';
    this.params = undefined;
    this.path = undefined;
    this.regexp = pathRegexp(path, this.keys = [], opts);

    // set fast path flags
    this.regexp.fast_star = path === '*'
    this.regexp.fast_slash = path === '/' && opts.end === false
  }

  match(path) {
    var match

    if (path != null) {
      // fast path non-ending match for / (any path matches)
      if (this.regexp.fast_slash) {
        this.params = {}
        this.path = ''
        return true
      }

      // fast path for * (everything matched in a param)
      if (this.regexp.fast_star) {
        this.params = {'0': decode_param(path)}
        this.path = path
        return true
      }

      // match the path
      match = this.regexp.exec(path)
    }

    if (!match) {
      this.params = undefined;
      this.path = undefined;
      return false;
    }

    // store values
    this.params = {};
    this.path = match[0]

    var keys = this.keys;
    var params = this.params;

    for (var i = 1; i < match.length; i++) {
      var key = keys[i - 1];
      var prop = key.name;
      var val = decode_param(match[i])

      if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
        params[prop] = val;
      }
    }

    return true;
  }
}

module.exports = Layer