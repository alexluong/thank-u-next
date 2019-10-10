import "./config/env"
import http from "http"
import express from "express"
import session from "express-session"
import socketio from "socket.io"
import cors from "cors"
import passport from "passport"
import jwt from "jsonwebtoken"
import { Strategy as TwitterStrategy } from "passport-twitter"
import { createStore } from "@tyn/database"
import { createTwitterAPI } from "./utils"
import createApolloServer from "./graphql"
import WebhookControllers from "./webhook"
import request from "request-promise"

const EO_LIST_ID = process.env.EO_LIST_ID
const EO_API_KEY = process.env.EO_API_KEY
const EO_API_URL = `https://emailoctopus.com/api/1.5/lists/${EO_LIST_ID}/contacts`

const API_URL = process.env.API_URL
const SESSION_SECRET = process.env.SESSION_SECRET
const TOKEN_SECRET = process.env.TOKEN_SECRET
const JWT_SECRET = process.env.JWT_SECRET
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET

const store = createStore()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Twitter Auth
app.use(express.json())
app.use(passport.initialize())

app.use(cors())

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)

passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

const twitterConfig = {
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: `${API_URL}/twitter/callback`,
}

passport.use(
  new TwitterStrategy(twitterConfig, async (token, secret, profile, cb) => {
    const { User, Whitelist } = store

    let user

    const existingUser = await User.findByPk(profile.id)
    if (existingUser) {
      user = existingUser.toJSON()
    } else {
      const newUser = await User.create({
        id: profile.id,
        username: profile.username,
        token: jwt.sign(token, TOKEN_SECRET),
        secret: jwt.sign(secret, TOKEN_SECRET),
      })
      user = newUser.toJSON()

      const twitterAPI = createTwitterAPI({ token, secret })
      const friends = await twitterAPI.getFriends()
      await Whitelist.bulkCreate(
        friends.ids.map(id => ({
          id: `${profile.id}.${id}`,
          whitelistUserId: id,
          userId: profile.id,
        })),
      )
    }

    cb(null, user)
  }),
)

const twitterAuth = passport.authenticate("twitter")

const addSocketIdToSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}

app.get("/twitter", addSocketIdToSession, twitterAuth)

app.get("/twitter/callback", twitterAuth, (req, res) => {
  io.in(req.session.socketId).emit("token", {
    token: jwt.sign(req.user, JWT_SECRET),
    username: req.user.username,
  })
  res.end()
})

// Twitter Webhooks
const webhookControllers = new WebhookControllers(store)

app.get("/twitter/webhook", (req, res) => webhookControllers.get(req, res))
app.post("/twitter/webhook", (req, res) => webhookControllers.post(req, res))

// Subscribe email list
app.post("/subscribe", async (req, res) => {
  try {
    await request.post({
      uri: EO_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: EO_API_KEY,
        email_address: req.body.email,
      }),
    })
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.get("/ping", (req, res) => res.status(200).send("pong"))

// Apollo
const apolloServer = createApolloServer(store)
apolloServer.applyMiddleware({ app })

// Start server
const PORT = process.env.PORT || 8080
server.listen({ port: PORT }, () =>
  console.log(`🚀 GraphQL ready at ${API_URL}/graphql`),
)
