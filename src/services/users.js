const User = require('../db/models/User')

async function createUser ({ id, name, email, favoriteSubreddits, sendNewsletter }) {
  try {
    const user = await User.create({ id, name, email, favoriteSubreddits, sendNewsletter })
    return user
  } catch (err) {
    throw new Error('Can\'t create a new user:', err.message)
  }
}

async function getUser ({ id }) {
  const user = User.findOne({ id })
  return user
}

module.exports = { createUser, getUser }
