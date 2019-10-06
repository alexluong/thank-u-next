import { createStore } from "@tyn/database"
import faker from "faker"
import shortId from "shortid"

const TWITTER_USER_ID = process.env.TWITTER_USER_ID || 1

async function mock() {
  const { Whitelist, Message } = createStore()

  function createWhitelist() {
    const whitelistUserId = shortId.generate()
    Whitelist.create({
      id: `${TWITTER_USER_ID}.${whitelistUserId}`,
      userId: TWITTER_USER_ID,
      whitelistUsername: faker.internet.userName(),
      whitelistUserId,
    })
  }

  function createMessage() {
    Message.create({
      id: shortId.generate(),
      message: faker.lorem.sentence(),
      fromUserId: shortId.generate(),
      fromUsername: faker.internet.userName(),
    })
  }

  createWhitelist()
  createWhitelist()
  createWhitelist()
  createWhitelist()
  createWhitelist()

  createMessage()
  createMessage()
  createMessage()
  createMessage()
  createMessage()
}

mock()
