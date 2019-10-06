import { createStore } from "@tyn/database"

async function init() {
  const { User, Whitelist, Message } = createStore()

  await Promise.all([
    User.sync({ force: true }),
    Whitelist.sync({ force: true }),
    Message.sync({ force: true }),
  ])
}

init()
