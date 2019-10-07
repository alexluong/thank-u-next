import { createTwitterAPI } from "../utils"
import { createStore } from "@tyn/database"

async function run() {
  const store = createStore()
  const twitterAPI = await createTwitterAPI(store)
  const response = await twitterAPI.getWebhook()
  console.log(response)
}

run()
