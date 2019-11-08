import TwitterAPI from "@tyn/twitter"

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN
const TWITTER_WEBHOOK_ENV = process.env.TWITTER_WEBHOOK_ENV
const API_URL = process.env.API_URL

export async function createTwitterAPI() {
  const config = {
    oauth: {
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      token: TWITTER_ACCESS_TOKEN,
      token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    },
    apiUrl: API_URL,
    webhookEnv: TWITTER_WEBHOOK_ENV,
    bearerToken: TWITTER_BEARER_TOKEN,
  }

  const twitterAPI = new TwitterAPI(config)

  return twitterAPI
}
