/* global describe it  expect beforeAll beforeEach afterAll */
const server = require('../../src/server')
const supertest = require('supertest')
const request = supertest(server)

const db = require('../dbInMemory')

// Setup connection to the database
beforeAll(async () => await db.connect())
beforeEach(async () => await db.clear())
afterAll(async () => await db.close())

const usersApiPath = '/api/v1/users'
const userParams = {
  id: 'tomasmax',
  name: 'Tomas Madariaga',
  email: 'me@tomasmax.com',
  favoriteSubreddits: ['worldnews', 'technology', 'funny'],
  sendNewsletter: false
}

const createUser = async () => {
  const postResponse = await request.post(usersApiPath).send(userParams)

  expect(postResponse.status).toBe(201)
}

describe('Controllers/users', () => {
  it('Should get a 404 for an unknown user id', async () => {
    const id = 'unknown'
    const response = await request.get(`${usersApiPath}/${id}`)

    expect(response.status).toBe(404)
  })

  it('Should throw a 404 error for no username provided', async () => {
    const response = await request.get(usersApiPath)

    expect(response.status).toBe(404)
  })

  it('Should create a user and get it from users endpoint', async () => {
    const postResponse = await request.post(usersApiPath).send(userParams)

    expect(postResponse.status).toBe(201)
    expect(postResponse.type).toEqual('application/json')
    expect(postResponse.body._id).not.toBeNull()

    const response = await request.get(`${usersApiPath}/${userParams.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(userParams)
  })

  it('Should update an existing user ', async () => {
    const postResponse = await request.post(usersApiPath).send(userParams)

    expect(postResponse.status).toBe(201)

    const updateUserParams = { id: 'tomasmax', name: 'Paco' }

    const response = await request.put(usersApiPath).send(updateUserParams)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({ name: 'Paco' })
  })

  it('Should throw a 400 trying to update a user without passing user id', async () => {
    const response = await request.put(usersApiPath).send({})

    expect(response.status).toBe(400)
  })

  it('Should throw a 404 trying to update a not registered user id', async () => {
    const response = await request
      .put(usersApiPath)
      .send({ id: userParams.id })

    expect(response.status).toBe(404)
  })

  it('Should add existing user subreddits', async () => {
    await createUser()

    const addSubredditsParams = {
      id: 'tomasmax',
      favoriteSubreddits: ['cooking', 'gaming']
    }
    const response = await request
      .patch(`${usersApiPath}/favorite-subreddits/add`)
      .send(addSubredditsParams)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      ...userParams,
      favoriteSubreddits: [
        ...userParams.favoriteSubreddits,
        ...addSubredditsParams.favoriteSubreddits
      ]
    })
  })

  it('Should remove existing user subreddits', async () => {
    await createUser()

    const addSubredditsParams = {
      id: 'tomasmax',
      favoriteSubreddits: ['worldnews']
    }
    const response = await request
      .patch(`${usersApiPath}/favorite-subreddits/remove`)
      .send(addSubredditsParams)

    expect(response.status).toBe(200)
    const expectedSubreddits = userParams.favoriteSubreddits.filter(
      (item) => item !== addSubredditsParams.favoriteSubreddits[0]
    )
    expect(response.body).toMatchObject({
      ...userParams,
      favoriteSubreddits: expectedSubreddits
    })
  })

  it('Should set existing user sendNewsletter flag', async () => {
    await createUser()

    const addSubredditsParams = {
      id: 'tomasmax',
      sendNewsletter: true
    }
    const response = await request
      .patch(`${usersApiPath}/set-send-newsletter`)
      .send(addSubredditsParams)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      ...userParams,
      sendNewsletter: true
    })
  })

  it('Should get a user newsletter in json', async () => {
    await createUser()

    const response = await request.get(`${usersApiPath}/tomasmax/newsletter`)

    expect(response.status).toBe(200)
    expect(response.type).toEqual('application/json')
    expect(Object.keys(response.body)).toEqual(
      expect.arrayContaining(userParams.favoriteSubreddits)
    )
  })

  it('Should get a user newsletter in html', async () => {
    await createUser()

    const response = await request.get(
      `${usersApiPath}/tomasmax/newsletter?contentType=html`
    )

    expect(response.status).toBe(200)
    expect(response.type).toEqual('text/html')
  })
})
