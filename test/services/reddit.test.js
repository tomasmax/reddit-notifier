/* global describe it  expect */
const redditService = require('../../src/services/reddit')

describe('Reddit service', () => {
  it('Should get top posts from worldnews subreddit', async () => {
    const response = await redditService.getSubredditTopPosts({
      subreddit: 'worldnews'
    })

    if (response) {
      expect(response).toBeInstanceOf(Array)
      expect(response.length).toBe(3)
      expect(Object.keys(response[0])).toEqual(
        expect.arrayContaining([
          'title',
          'subredditUrl',
          'ups',
          'upsFormatted',
          'externalUrl',
          'permalink',
          'thumbnail',
          'previewImage'
        ])
      )
    }
  })
})
