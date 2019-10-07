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
   *   bearerToken: "",
   * }
   */
  constructor(config) {
    this.oauth = config.oauth
    this.webhookEnv = config.webhookEnv
    this.apiUrl = config.apiUrl
    this.bearerToken = config.bearerToken
  }

  getBearerToken() {
    return request.post({
      url: `https://api.twitter.com/oauth2/token?grant_type=client_credentials`,
      auth: {
        user: this.oauth.consumer_key,
        pass: this.oauth.consumer_secret,
      },
      json: true,
    })
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

  getSubscription() {
    return request.get({
      url: `${TWITTER_API_URL}/account_activity/all/${this.webhookEnv}/subscriptions.json`,
      oauth: this.oauth,
      json: true,
    })
  }

  createSubscription() {
    return request.post({
      url: `${TWITTER_API_URL}/account_activity/all/${this.webhookEnv}/subscriptions.json`,
      oauth: this.oauth,
      json: true,
    })
  }

  deleteSubscription(userId) {
    return request.delete({
      url: `${TWITTER_API_URL}/account_activity/all/${this.webhookEnv}/subscriptions/${userId}.json`,
      headers: {
        authorization: `Bearer ${this.bearerToken}`,
      },
      json: true,
    })
  }
}

module.exports = TwitterAPI
