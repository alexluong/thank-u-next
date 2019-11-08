import { createTwitterAPI } from "../utils"

async function run() {
  try {
    const twitterAPI = await createTwitterAPI()
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
