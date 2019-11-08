import { createTwitterAPI } from "../utils"

async function run() {
  const twitterAPI = await createTwitterAPI()
  const response = await twitterAPI.createSubscription()
  console.log(response)
}

run()
