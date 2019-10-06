import { ApolloServer } from "apollo-server-express"
import jwt from "jsonwebtoken"
import typeDefs from "./schema"
import resolvers from "./resolvers"
// import UserAPI from "./datasources/user"
// import TweetAPI from "./datasources/tweet"
import TwitterAPI from "../twitter"

const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_SECRET = process.env.TOKEN_SECRET
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET

function createApolloServer(store) {
  const dataSources = () => ({
    //   userAPI: new UserAPI({ store }),
    //   tweetAPI: new TweetAPI({ store }),
  })

  const context = ({ req }) => {
    const ctx = {}
    const accessToken = req.headers.authorization
    if (accessToken) {
      ctx.user = jwt.verify(accessToken.replace("Bearer ", ""), JWT_SECRET)
      let { token, secret } = ctx.user
      token = jwt.verify(token, TOKEN_SECRET)
      secret = jwt.verify(secret, TOKEN_SECRET)
      ctx.twitterAPI = new TwitterAPI({
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
        token,
        token_secret: secret,
      })
    } else {
      throw new Error("Unauthenticated")
    }

    return ctx
  }

  return new ApolloServer({ typeDefs, resolvers, dataSources, context })
}

export default createApolloServer
