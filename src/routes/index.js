const Express = require('express')
const cors = require('cors')
const {
  getUser,
  createUser
} = require('../controllers/users')

const app = new Express()
app.use(cors())

app.get('/users/:id', getUser)
app.post('/users', createUser)

module.exports = app
