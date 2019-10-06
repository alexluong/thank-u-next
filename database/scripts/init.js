import SQL from "sequelize"
import { createStore } from "../src"

async function init() {
  const { User, Whitelist, Message } = createStore()

  await Promise.all([
    User.sync({ force: true }),
    Whitelist.sync({ force: true }),
    Message.sync({ force: true }),
  ])
}

init()
