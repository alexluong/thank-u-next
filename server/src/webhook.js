import crypto from "crypto"
import jwt from "jsonwebtoken"
import shortId from "shortid"
import { isNext } from "@tyn/thank-u-next"
import { createTwitterAPI } from "./utils"

const TOKEN_SECRET = process.env.TOKEN_SECRET

class WebhookControllers {
  constructor(store) {
    this.store = store
  }

  /**
   * Validate callback url
   */
  get(req, res) {
    const crcToken = req.query.crc_token
    if (crcToken) {
      res
        .status(200)
        .send({ response_token: this.createCrcResponseToken(crcToken) })
    }
  }

  /**
   * Webhook callback
   */
  async post(req, res) {
    try {
      if (!req.body.direct_message_events) {
        return res.sendStatus(200)
      }

      const { User, Whitelist, Message } = this.store

      const dmEvent = req.body.direct_message_events[0]
      const message = dmEvent.message_create
      const text = message.message_data.text
      const forUserId = req.body.for_user_id
      const senderUserId = message.sender_id
      const recipientUserId = message.target.recipient_id

      const isIncomingMessage = forUserId === recipientUserId

      if (isIncomingMessage) {
        if (isNext(text)) {
          // Find user
          const user = await User.findByPk(forUserId)
          if (!user) {
            return res.sendStatus(200)
          }

          // Check whitelist
          const whitelistId = `${forUserId}.${senderUserId}`
          const whitelist = await Whitelist.findByPk(whitelistId)
          if (!whitelist) {
            // Delete
            let { token, secret } = user
            token = jwt.verify(token, TOKEN_SECRET)
            secret = jwt.verify(secret, TOKEN_SECRET)
            const twitterAPI = createTwitterAPI({ token, secret })
            await twitterAPI.deleteMessage(dmEvent.id)
            await Message.create({
              id: shortId.generate(),
              message: text,
              fromUserId: senderUserId,
              fromUserName: req.body.users[senderUserId].screen_name,
              userId: forUserId,
            })
          }
        }
      } else {
        // Save to whitelist
        await Whitelist.findOrCreate({
          where: { whitelistUserId: recipientUserId },
          defaults: {
            id: `${forUserId}.${recipientUserId}`,
            userId: forUserId,
          },
        })
      }

      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(200)
    }
  }

  createCrcResponseToken(crcToken) {
    const hmac = crypto
      .createHmac("sha256", process.env.TWITTER_CONSUMER_SECRET)
      .update(crcToken)
      .digest("base64")
    return `sha256=${hmac}`
  }
}

export default WebhookControllers
