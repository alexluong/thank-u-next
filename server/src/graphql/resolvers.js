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
