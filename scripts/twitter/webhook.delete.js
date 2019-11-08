import { createTwitterAPI } from "../utils"

async function run() {
  const twitterAPI = await createTwitterAPI()
  const webhooks = await twitterAPI.getWebhook()
  const webhookId = webhooks[0].id
  const response = await twitterAPI.deleteWebhook(webhookId)
  console.log(response)
}

run()
