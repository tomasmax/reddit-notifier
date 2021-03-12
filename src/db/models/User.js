const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  favoriteSubreddits: {
    type: Array,
    required: true
  },
  sendNewsletter: {
    type: Boolean,
    required: true
  }
})

const User = model('user', userSchema)

module.exports = User
