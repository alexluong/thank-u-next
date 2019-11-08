import { createTwitterAPI } from "../utils"

async function run() {
  const twitterAPI = await createTwitterAPI()
  const response = await twitterAPI.getSubscription()
  console.log(response)
}

run()
