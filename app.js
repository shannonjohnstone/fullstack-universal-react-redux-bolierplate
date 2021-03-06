/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
require('babel-core/register')({
  presets: ['react', 'es2015', 'es2016', 'es2017', 'stage-1', 'stage-0']
})

const express = require('express')
const logger = require('morgan')
const path = require('path')
const favicon = require('serve-favicon')
const errorHandlers = require('./handlers/errorHandlers')
const httpProxy = require('http-proxy')
const env = require('node-env-file')

const requestHandler = require('./requestHandler')

switch (process.env.NODE_ENV = 'development') {
  case 'development': {
    console.log('DEVELOPMENT MODE - CLIENT') // eslint-disable-line
    env(path.resolve(__dirname, '.env.dev'))
    break
  }
  default: {
    env(path.resolve(__dirname, '.env'))
    console.log('PRODUCTION MODE - CLIENT') // eslint-disable-line
  }
}

const app = express()
app.use(logger('dev'))

// PROXY --------------------------------------------------------------------------------------------
const apiProxy = httpProxy.createProxyServer()
app.all('/api/*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:3001/' })
})
// END PROXY ----------------------------------------------------------------------------------------

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')
app.use(requestHandler)
// app.get('*', (req, res) => {
//   requestHandler(req, res)
// })

// app.get('*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound)

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors)

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)
}

// production error handler
app.use(errorHandlers.productionErrors)

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   const err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })
//
// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}
//
//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

app.listen(process.env.CLIENT_PORT, (err) => {
  if (err) console.log(err, 'client app err') // eslint-disable-line
  console.log('Client app is listening on http://localhost:3000') // eslint-disable-line
})

module.exports = app
