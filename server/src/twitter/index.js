import request from "request-promise"

const TWITTER_API_URL = "https://api.twitter.com/1.1"

class TwitterAPI {
  constructor(oauth) {
    this.oauth = oauth
  }

  getFriends() {
    return request.get({
      url: `${TWITTER_API_URL}/friends/ids.json?stringify_ids=true`,
      oauth: this.oauth,
      json: true,
    })
  }
}

export default TwitterAPI
