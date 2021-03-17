const express = require('express')
const cors = require('cors')
const apiRoutes = require('./api')
const errorHandler = require('./middlewares/errorHandler')
const setupDB = require('./db')
const server = express()
const path = require('path')
require('dotenv').config()
const { newsletterEmailScheduler } = require('./services/emailSender')

const { NODE_ENV, MONGO_DB_CONNECT } = process.env

// Set up DB connection
if (NODE_ENV !== 'test') {
  setupDB(MONGO_DB_CONNECT)
}

server.use(cors())

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/api', apiRoutes())

server.use(errorHandler)
server.set('view engine', 'pug')
server.set('views', path.join(__dirname, 'views'))
newsletterEmailScheduler()

module.exports = server
