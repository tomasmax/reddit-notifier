const { NotFound, BadRequest } = require('../errors/http')
const usersService = require('../services/users')

async function getUser (req, res, next) {
  try {
    const user = await usersService.getUser(req.params)

    if (!user) {
      throw new NotFound()
    }

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

async function createUser (req, res, next) {
  try {
    const { id, name, email, favoriteSubreddits, sendNewsletter } = req.body

    if (!id || !name || !email || !favoriteSubreddits || typeof sendNewsletter === 'undefined') {
      throw new BadRequest('Check you sent all needed params')
    }

    const user = await usersService.createUser({ id, name, email, favoriteSubreddits, sendNewsletter })

    return res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = { getUser, createUser }
