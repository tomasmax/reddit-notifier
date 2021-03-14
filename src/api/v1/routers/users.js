const express = require('express')
const {
  getUser,
  createUser,
  updateUser,
  addFavoriteSubreddits,
  removeFavoriteSubreddits,
  setSendNewsletter
} = require('../../../controllers/users')

function usersRouter () {
  const router = express.Router()

  // routes over /users
  router.get('/:id', getUser)
  router.post('/', createUser)
  router.put('/', updateUser)
  router.patch('/favorite-subreddits/add', addFavoriteSubreddits)
  router.patch('/favorite-subreddits/remove', removeFavoriteSubreddits)
  router.patch('/setSendNewsletter', setSendNewsletter)

  return router
}

module.exports = usersRouter
