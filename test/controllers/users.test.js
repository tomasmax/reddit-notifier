/* global describe it  expect */
const server = require('../../src/server')
const supertest = require('supertest')
const request = supertest(server)

describe('Controllers/users', () => {
  it('Should get user from users endpoint', async () => {
    const username = 'tomasmax'
    const response = await request.get(`/users/${username}`)

    expect(response.status).toBe(200)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual({ email: 'tomasmax@gmail.com', username: 'tomasmax' })
  })

  it('Should throw a 404 error for no username provided', async () => {
    const response = await request.get('/users/')

    expect(response.status).toBe(404)
  })
})
