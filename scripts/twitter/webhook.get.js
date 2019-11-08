import { createTwitterAPI } from "../utils"

async function run() {
  const twitterAPI = await createTwitterAPI()
  const response = await twitterAPI.getWebhook()
  console.log(response)
}

run()
