const Express = require('express')
const cors = require('cors')
const {
  getUser
} = require('../controllers/users')

const app = new Express()
app.use(cors())

app.get('/users/:username', getUser)

module.exports = app
