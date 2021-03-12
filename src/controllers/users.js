const { NotFound } = require('../errors/http')

async function getUser (req, res, next) {
  try {
    const { username } = req.params
    // TODO: gather user from DB
    const user = { username, email: `${username}@gmail.com` }

    if (!user || !username) {
      throw new NotFound()
    }
    return res.json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = { getUser }
