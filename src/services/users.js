'use strict'
const User = require('../db/models/User')

async function createUser ({
  id,
  name,
  email,
  favoriteSubreddits,
  sendNewsletter
}) {
  try {
    const user = await User.create({
      id,
      name,
      email,
      favoriteSubreddits,
      sendNewsletter
    })
    return user
  } catch (err) {
    console.error('Cant create a new user', err.message)
    throw new Error('Cant create a new user', err.message)
  }
}

async function getUser ({ id }) {
  try {
    const user = await User.findOne({ id })
    return user
  } catch (err) {
    console.error('Error getting user', err.message)
    throw new Error('Error getting user', err.message)
  }
}

async function updateUser ({
  id,
  name,
  email,
  favoriteSubreddits,
  sendNewsletter
}) {
  try {
    const user = await User.findOne({ id })

    if (!user) {
      return
    }

    user.id = id || user.id
    user.name = name || user.name
    user.email = email || user.email
    user.favoriteSubreddits = favoriteSubreddits || user.favoriteSubreddits
    user.sendNewsletter = sendNewsletter || user.sendNewsletter

    user.save()
    return user
  } catch (err) {
    console.error('Error updating user', err.message)
    throw new Error('Error updating user', err.message)
  }
}

async function addFavoriteSubreddits ({ id, favoriteSubreddits }) {
  try {
    const user = await User.findOne({ id })

    if (!user) {
      return
    }

    if (!Array.isArray(favoriteSubreddits)) {
      favoriteSubreddits = [favoriteSubreddits]
    }

    user.favoriteSubreddits = [
      ...user.favoriteSubreddits,
      ...favoriteSubreddits
    ]
    user.save()
    return user
  } catch (err) {
    console.error('Error adding favorite subreddits', err.message)
    throw new Error('Error adding favorite subreddits', err.message)
  }
}

async function removeFavoriteSubreddits ({ id, favoriteSubreddits }) {
  try {
    const user = await User.findOne({ id })

    if (!user) {
      return
    }

    if (!Array.isArray(favoriteSubreddits)) {
      favoriteSubreddits = [favoriteSubreddits]
    }

    user.favoriteSubreddits = user.favoriteSubreddits.filter(
      (subreddit) => !favoriteSubreddits.includes(subreddit)
    )
    user.save()
    return user
  } catch (err) {
    console.error('Error removing favorite subreddits', err.message)
    throw new Error('Error removing favorite subreddits', err.message)
  }
}

async function setSendNewsletter ({ id, sendNewsletter }) {
  try {
    const user = await User.findOne({ id })

    if (!user) {
      return
    }

    user.sendNewsletter = sendNewsletter

    user.save()
    return user
  } catch (err) {
    console.error('Error setSendNewsletter', err.message)
    throw new Error('Error setSendNewsletter', err.message)
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  addFavoriteSubreddits,
  removeFavoriteSubreddits,
  setSendNewsletter
}
