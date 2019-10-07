import { ApolloServer } from "apollo-server-express"
import jwt from "jsonwebtoken"
import typeDefs from "./schema"
import resolvers from "./resolvers"
import UserAPI from "./datasources/user"
import { createTwitterAPI } from "../utils"

const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_SECRET = process.env.TOKEN_SECRET

function createApolloServer(store) {
  const dataSources = () => ({
    userAPI: new UserAPI({ store }),
  })

  const context = ({ req }) => {
    const ctx = {}
    const accessToken = req.headers.authorization
    if (accessToken) {
      ctx.user = jwt.verify(accessToken.replace("Bearer ", ""), JWT_SECRET)

      // Get token and secret from user to create TwitterAPI instance
      let { token, secret } = ctx.user
      token = jwt.verify(token, TOKEN_SECRET)
      secret = jwt.verify(secret, TOKEN_SECRET)

      ctx.twitterAPI = createTwitterAPI({ token, secret })
    } else {
      throw new Error("Unauthenticated")
    }

    return ctx
  }

  return new ApolloServer({ typeDefs, resolvers, dataSources, context })
}

export default createApolloServer
