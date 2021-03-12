const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const setupDB = require('./db')
const server = express()

const { NODE_ENV, MONGO_DB_CONNECT = 'mongodb://admin:admin@localhost:27017/reddit-notifier?authSource=admin' } = process.env

// Set up DB connection
if (NODE_ENV !== 'test') {
  setupDB(MONGO_DB_CONNECT)
}

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(routes)

server.use(errorHandler)

module.exports = server
