import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routes from './app/http/routes'
import bodyParser from 'body-parser'
import ev from 'express-validation'

dotenv.config()
const app = express()

// use parse content type, ignore form-data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// add middleware allow cors
app.use(cors())

// define route for system
app.use(routes)

// exception validation. To do: Write func handle all exception
app.use((err, req, res, next) => {
  // specific for validation errors
  if (err instanceof ev.ValidationError) return res.status(err.status).json(err)

  // other type of errors, it *might* also be a Runtime Error
  // example handling
  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).send(err.stack)
  } else {
    return res.status(500)
  }
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = app
