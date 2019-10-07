import { createTwitterAPI } from "../utils"
import { createStore } from "@tyn/database"

async function run() {
  const store = createStore()
  const user = await store.User.findByPk(process.env.TWITTER_USER_ID)
  const twitterAPI = await createTwitterAPI(store)
  const response = await twitterAPI.deleteWebhook(user.toJSON().webhookId)
  console.log(response)
}

run()
