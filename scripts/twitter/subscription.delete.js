import { createTwitterAPI } from "../utils"

async function run() {
  const twitterAPI = await createTwitterAPI()
  const response = await twitterAPI.deleteSubscription(
    process.env.TWITTER_USER_ID,
  )
  console.log(response)
}

run()
