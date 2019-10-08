import { createTwitterAPI } from "../utils"
import { createStore } from "@tyn/database"

async function run() {
  try {
    const store = createStore()
    const twitterAPI = await createTwitterAPI(store)
    const webhooks = await twitterAPI.getWebhook()
    if (webhooks.length > 0) {
      await twitterAPI.deleteWebhook(webhooks[0].id)
    }
    await twitterAPI.createWebhook()
    await twitterAPI.createSubscription()
    console.log("Successfully init set up")
  } catch (error) {
    console.log(error)
  }
}

run()
