const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded())

server.use(routes)

server.use(errorHandler)

module.exports = server
