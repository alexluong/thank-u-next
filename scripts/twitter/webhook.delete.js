import { createTwitterAPI } from "../utils"
import { createStore } from "@tyn/database"

async function run() {
  const store = createStore()
  const twitterAPI = await createTwitterAPI(store)
  const webhooks = await twitterAPI.getWebhook()
  const webhookId = webhooks[0].id
  const response = await twitterAPI.deleteWebhook(webhookId)
  console.log(response)
}

run()
