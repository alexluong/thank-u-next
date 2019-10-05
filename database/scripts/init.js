import SQL from "sequelize"
import { createStore } from "../src"

async function init() {
  const { User } = createStore()

  await Promise.all([User.sync({ force: true })])
}

init()
