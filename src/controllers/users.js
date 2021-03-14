'use strict'
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

    if (
      !id ||
      !name ||
      !email ||
      !favoriteSubreddits ||
      typeof sendNewsletter === 'undefined'
    ) {
      throw new BadRequest('Check you sent all needed params')
    }

    const user = await usersService.createUser({
      id,
      name,
      email,
      favoriteSubreddits,
      sendNewsletter
    })

    return res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

async function updateUser (req, res, next) {
  try {
    const { id } = req.body

    if (!id) {
      throw new BadRequest('Missing required parameter user id')
    }

    const user = await usersService.updateUser(req.body)

    if (!user) {
      throw new NotFound()
    }

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

async function addFavoriteSubreddits (req, res, next) {
  try {
    const { id } = req.body

    if (!id) {
      throw new BadRequest('Missing required parameter user id')
    }

    const user = await usersService.addFavoriteSubreddits(req.body)

    if (!user) {
      throw new NotFound()
    }

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

async function removeFavoriteSubreddits (req, res, next) {
  try {
    const { id } = req.body

    if (!id) {
      throw new BadRequest('Missing required parameter user id')
    }

    const user = await usersService.removeFavoriteSubreddits(req.body)

    if (!user) {
      throw new NotFound()
    }

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

async function setSendNewsletter (req, res, next) {
  try {
    const { id, sendNewsletter } = req.body

    if (!id) {
      throw new BadRequest('Missing required parameter user id')
    }

    if (typeof sendNewsletter === 'undefined') {
      throw new BadRequest('Missing required parameter sendNewsletter')
    }

    const user = await usersService.setSendNewsletter(req.body)

    if (!user) {
      throw new NotFound()
    }

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  addFavoriteSubreddits,
  removeFavoriteSubreddits,
  setSendNewsletter
}
