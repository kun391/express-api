import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routes from './App/Http/routes'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'

dotenv.config()
const app = express()
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // support encoded bodies

app.use(expressValidator())
app.use(cors())
app.use(routes)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
  next()
})

module.exports = app
