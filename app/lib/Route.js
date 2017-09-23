import { Router } from 'express'
import Layer from '../lib/Layer'

Router.group = function (middlewares, routes, router) {

  if (routes instanceof Array && routes.length > 0) {
    middlewares.forEach(middleware => {
      routes.forEach(route => {
        console.log(route)
        const layer = new Layer('/', {}, middleware);
        layer.method = route.method
        // this.methods[route.method] = true
        layer.path = route.route
        this.path = route.route
        this.stack.push(layer);
      })
    })
    // this.use(mids)
  }
  router(this)
  if (router && router instanceof Function) {
    router(this)
  }
  console.log(this.stack);

  this.quantity += 1
  return this
}

module.exports = Router()
