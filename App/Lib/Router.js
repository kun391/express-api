import { Router } from 'express'

Router.group = function (nameGroup, middlewares, routes) {
  let router, mids

  if (router === undefined) {
    mids = nameGroup
    router = middlewares
  } else {
    router = routes
  }

  if (mids instanceof Array && mids.length > 0) {
    mids.forEach((mid) => {
      this.use(mid)
    })
  }

  if (router && router instanceof Function) {
    router(this)
  }

  return this
}

module.exports = Router()
