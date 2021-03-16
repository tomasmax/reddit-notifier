'use strict'
const axios = require('axios')

const fromThousandsNumberToKString = (number = 0) =>
  number > 999 ? `${(number / 1000).toFixed(0)}K` : number.toString()

/**
 *
 * @param {string} subreddit - Subreddit name
 * @param {string} time - Timeframe for posts
 * @param {number} limit - Limit posts amount
 */
async function getSubredditTopPosts ({ subreddit, limit = 3, time = 'day' }) {
  try {
    const topPostsApiResponse = await axios.get(
      `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&time=${time}`
    )
    if (
      topPostsApiResponse.data &&
      topPostsApiResponse.data.data &&
      topPostsApiResponse.data.data.children &&
      topPostsApiResponse.data.data.children.length > 0
    ) {
      const { children: topPosts } = topPostsApiResponse.data.data

      const mappedPosts = topPosts.map((post) => {
        const {
          title,
          // eslint-disable-next-line camelcase
          subreddit_name_prefixed,
          ups,
          url,
          permalink,
          thumbnail,
          preview
        } = post.data
        return {
          title,
          subredditUrl: `https://www.reddit.com/${subreddit_name_prefixed}/top`,
          ups,
          upsFormatted: fromThousandsNumberToKString(ups),
          externalUrl: url,
          permalink: `https://www.reddit.com${permalink}`,
          thumbnail,
          previewImage:
            preview &&
            preview.images &&
            preview.images[0] &&
            (preview.images[0].source.url).replace(/&amp;/g, '&')
        }
      })

      return mappedPosts
    }
  } catch (err) {
    console.error('Error getting top posts from reddit API', err.message)
    throw new Error('Error getting top posts from reddit API')
  }
}

module.exports = {
  getSubredditTopPosts
}
