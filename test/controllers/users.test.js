/* global describe it  expect */
const server = require('../../src/server')
const supertest = require('supertest')
const request = supertest(server)

const db = require('../dbInMemory')

// Setup connection to the database
beforeAll(async () => await db.connect())
beforeEach(async () => await db.clear())
afterAll(async () => await db.close())

describe('Controllers/users', () => {
  it('Should get a 404 for an unknown user id', async () => {
    const id = 'unknown'
    const response = await request.get(`/users/${id}`)

    expect(response.status).toBe(404)
  })

  it('Should throw a 404 error for no username provided', async () => {
    const response = await request.get('/users/')

    expect(response.status).toBe(404)
  })

  it('Should create a user and get it from users endpoint', async () => {
    const userParams = { id: 'tomasmax', name: 'Tomas Madariaga', email: 'me@tomasmax.com', favoriteSubreddits: ['worldnews', 'technology', 'funny'], sendNewsletter: false }
    const postResponse = await request.post('/users/').send(userParams)

    expect(postResponse.status).toBe(201)
    expect(postResponse.type).toEqual('application/json')
    expect(postResponse.body._id).not.toBeNull()

    const response = await request.get(`/users/${userParams.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(userParams)
  })
})
