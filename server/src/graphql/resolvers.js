const resolvers = {
  Query: {
    hello: async (root, args, { twitterAPI }) => {
      const response = await twitterAPI.getWebhook()
      console.log(response)
      return "Hello world!"
    },

    /**
     * Dashboard View
     */
    dashboardView: async (root, args, { user, dataSources }) => {
      const dbUser = await dataSources.userAPI.findUser(user.id)
      return {
        id: "DashboardView",
        isWebhookEnabled: Boolean(dbUser.toJSON().isWebhookEnabled),
      }
    },

    /**
     * Messages View
     */
    messagesView: async (root, args, { user, dataSources }) => {
      const messages = await dataSources.messageAPI.findMessagesByUser(user.id)
      let conversations = messages.reduce((acc, message) => {
        const messageData = {
          id: message.id,
          message: message.message,
          createdAt: message.createdAt,
        }
        if (acc.has(message.fromUserId)) {
          const data = acc.get(message.fromUserId)
          acc.set(message.fromUserId, {
            ...data,
            messages: [...data.messages, messageData],
          })
        } else {
          acc.set(message.fromUserId, {
            id: message.fromUserId,
            fromUserId: message.fromUserId,
            fromUserName: message.fromUserName,
            messages: [messageData],
          })
        }
        return acc
      }, new Map())
      return {
        id: "MessagesView",
        conversations,
      }
    },
  },

  Mutation: {
    /**
     * Toggle Webhook
     */
    toggleWebhook: async (root, args, { user, dataSources, twitterAPI }) => {
      try {
        const dbUser = await dataSources.userAPI.findUser(user.id)
        const isWebhookEnabled = dbUser.toJSON().isWebhookEnabled
        if (isWebhookEnabled) {
          await twitterAPI.deleteSubscription(user.id)
        } else {
          await twitterAPI.createSubscription()
        }
        await dbUser.update({ isWebhookEnabled: !isWebhookEnabled })
        return {
          id: "DashboardView",
          isWebhookEnabled: !isWebhookEnabled,
        }
      } catch (error) {
        console.log(error)
        throw new Error("Internal Server Error")
      }
    },
  },
}

export default resolvers
