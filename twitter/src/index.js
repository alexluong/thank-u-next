const request = require("request-promise")

const TWITTER_API_URL = "https://api.twitter.com/1.1"

class TwitterAPI {
  /**
   *
   * @param {object} config
   * {
   *   oauth: Oauth,
   *   webhookEnv: "",
   *   apiUrl: "",
   * }
   */
  constructor(config) {
    this.oauth = config.oauth
    this.webhookEnv = config.webhookEnv
    this.apiUrl = config.apiUrl
  }

  getFriends() {
    return request.get({
      url: `${TWITTER_API_URL}/friends/ids.json?stringify_ids=true`,
      oauth: this.oauth,
      json: true,
    })
  }

  deleteMessage(id) {
    return request.delete({
      url: `${TWITTER_API_URL}/direct_messages/events/destroy.json?id=${id}`,
      oauth: this.oauth,
      json: true,
    })
  }

  getWebhook() {
    return request.get({
      url: `${TWITTER_API_URL}/account_activity/all/${this.webhookEnv}/webhooks.json`,
      oauth: this.oauth,
      json: true,
    })
  }

  createWebhook() {
    return request.post({
      url: `${TWITTER_API_URL}/account_activity/all/${this.webhookEnv}/webhooks.json`,
      oauth: this.oauth,
      form: {
        url: `${this.apiUrl}/twitter/webhook`,
      },
      json: true,
    })
  }

  deleteWebhook(id) {
    return request.delete({
      url: `${TWITTER_API_URL}/account_activity/all/${this.webhookEnv}/webhooks/${id}.json`,
      oauth: this.oauth,
      json: true,
    })
  }
}

module.exports = TwitterAPI
