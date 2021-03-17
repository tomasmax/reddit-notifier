const express = require('express')
const {
  getUser,
  createUser,
  updateUser,
  addFavoriteSubreddits,
  removeFavoriteSubreddits,
  setSendNewsletter,
  getUserNewsletter,
  sendNewsletterByEmail
} = require('../../../controllers/users')

function usersRouter () {
  const router = express.Router()

  // routes over /users
  router.get('/:id', getUser)
  router.post('/', createUser)
  router.put('/', updateUser)
  router.patch('/favorite-subreddits/add', addFavoriteSubreddits)
  router.patch('/favorite-subreddits/remove', removeFavoriteSubreddits)
  router.patch('/set-send-newsletter', setSendNewsletter)
  router.get('/:id/newsletter', getUserNewsletter)
  router.get('/:id/send-newsletter', sendNewsletterByEmail)

  return router
}

module.exports = usersRouter
