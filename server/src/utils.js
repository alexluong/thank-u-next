import TwitterAPI from "@tyn/twitter"

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN
const TWITTER_WEBHOOK_ENV = process.env.TWITTER_WEBHOOK_ENV
const API_URL = process.env.API_URL

export function createTwitterAPI({ token, secret }) {
  return new TwitterAPI({
    oauth: {
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      token,
      token_secret: secret,
    },
    webhookEnv: TWITTER_WEBHOOK_ENV,
    bearerToken: TWITTER_BEARER_TOKEN,
    apiUrl: API_URL,
  })
}
