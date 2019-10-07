import crypto from "crypto"

function createCrcResponseToken(crcToken) {
  const hmac = crypto
    .createHmac("sha256", process.env.TWITTER_CONSUMER_SECRET)
    .update(crcToken)
    .digest("base64")
  return `sha256=${hmac}`
}

export default {
  /**
   * Validate callback url
   */
  get: (req, res) => {
    const crcToken = req.query.crc_token
    if (crcToken) {
      res.status(200).send({ response_token: createCrcResponseToken(crcToken) })
    }
  },

  /**
   * Webhook callback
   */
  post: (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
  },
}
