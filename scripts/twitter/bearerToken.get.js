import { createTwitterAPI } from "../utils"

async function run() {
  const twitterAPI = await createTwitterAPI()
  const response = await twitterAPI.getBearerToken()
  console.log(response)
}

run()
