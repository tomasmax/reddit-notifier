const express = require('express')
const cors = require('cors')
const apiRoutes = require('./api')
const errorHandler = require('./middlewares/errorHandler')
const setupDB = require('./db')
const server = express()

const { NODE_ENV, MONGO_DB_CONNECT = 'mongodb://admin:admin@localhost:27017/reddit-notifier?authSource=admin' } = process.env

// Set up DB connection
if (NODE_ENV !== 'test') {
  setupDB(MONGO_DB_CONNECT)
}

server.use(cors())

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/api', apiRoutes())

server.use(errorHandler)

module.exports = server
