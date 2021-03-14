const express = require('express')
const usersRouter = require('./routers/users')

function apiV1Router () {
  const router = express.Router()

  router.use('/users', usersRouter())

  return router
}

module.exports = apiV1Router
