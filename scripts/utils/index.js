import TwitterAPI from "@tyn/twitter"
import jwt from "jsonwebtoken"

const TOKEN_SECRET = process.env.TOKEN_SECRET
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN
const TWITTER_USER_ID = process.env.TWITTER_USER_ID
const TWITTER_WEBHOOK_ENV = process.env.TWITTER_WEBHOOK_ENV
const API_URL = process.env.API_URL

export async function createTwitterAPI(store) {
  const { User } = store

  const user = await User.findByPk(TWITTER_USER_ID)
  const { token, secret } = user.toJSON()

  const config = {
    oauth: {
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      token: jwt.verify(token, TOKEN_SECRET),
      token_secret: jwt.verify(secret, TOKEN_SECRET),
    },
    apiUrl: API_URL,
    webhookEnv: TWITTER_WEBHOOK_ENV,
    bearerToken: TWITTER_BEARER_TOKEN,
  }

  const twitterAPI = new TwitterAPI(config)

  return twitterAPI
}
