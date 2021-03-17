'use strict'
const User = require('../db/models/User')

async function createUser ({
  id,
  name,
  email,
  favoriteSubreddits,
  sendNewsletter
} = {}) {
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
    console.error('Cant create a new user:', err.message)
    throw new Error('Cant create a new user:', err.message)
  }
}

async function getUser ({ id } = {}) {
  try {
    const user = await User.findOne({ id })

    if (!user) {
      return
    }
    return user
  } catch (err) {
    console.error('Error getting user:', err.message)
    throw new Error('Error getting user:', err.message)
  }
}

async function updateUser ({
  id,
  name,
  email,
  favoriteSubreddits,
  sendNewsletter
} = {}) {
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
    console.error('Error updating user:', err.message)
    throw new Error('Error updating user:', err.message)
  }
}

async function addFavoriteSubreddits ({ id, favoriteSubreddits } = {}) {
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
    console.error('Error adding favorite subreddits:', err.message)
    throw new Error('Error adding favorite subreddits:', err.message)
  }
}

async function removeFavoriteSubreddits ({ id, favoriteSubreddits } = {}) {
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
    console.error('Error removing favorite subreddits:', err.message)
    throw new Error('Error removing favorite subreddits:', err.message)
  }
}

async function setSendNewsletter ({ id, sendNewsletter } = {}) {
  try {
    const user = await User.findOne({ id })

    if (!user) {
      return
    }

    user.sendNewsletter = sendNewsletter

    user.save()
    return user
  } catch (err) {
    console.error('Error setSendNewsletter:', err.message)
    throw new Error('Error setSendNewsletter:', err.message)
  }
}

async function getUserNewsletter ({ id } = {}) {
  try {
    const user = await User.findOne({ id })

    if (!user) {
      return
    }

    const { getSubredditTopPosts } = require('./reddit')
    const newsletter = {}

    await Promise.all(
      user.favoriteSubreddits.map(async (subreddit) => {
        console.log(
          `Creating user ${id} newsletter for subreddit ${subreddit}`
        )
        newsletter[subreddit] = await getSubredditTopPosts({ subreddit })
      })
    )

    return { user, newsletter }
  } catch (err) {
    console.error('Error getUserNewsletter:', err.message)
    throw new Error('Error getUserNewsletter:', err.message)
  }
}

async function sendNewsletterByEmail ({ id } = {}) {
  try {
    const { user, newsletter } = await getUserNewsletter({ id })

    if (!user) {
      return
    }

    const pug = require('pug')
    const path = require('path')
    const { sendEmail } = require('./emailSender')
    const html = pug.renderFile(
      path.join(__dirname, '../views/reddit/newsletter.pug'),
      {
        user,
        newsletter
      }
    )

    console.log(`Sending email for user ${user.name} to email ${user.email}`)
    const isEmailSent = sendEmail({ to: user.email, html })

    return isEmailSent
  } catch (err) {
    console.error('Error sendNewsletterByEmail:', err.message)
    throw new Error('Error sendNewsletterByEmail:', err.message)
  }
}

async function getAllUsers () {
  try {
    const users = await User.find()
    return users
  } catch (err) {
    console.error('Error getAllUsers', err.message)
    throw new Error('Error getAllUsers', err.message)
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  addFavoriteSubreddits,
  removeFavoriteSubreddits,
  setSendNewsletter,
  getUserNewsletter,
  sendNewsletterByEmail,
  getAllUsers
}
