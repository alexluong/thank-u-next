const resolvers = {
  Query: {
    hello: async (root, args, { twitterAPI }) => {
      const response = await twitterAPI.getFriends()
      console.log(response)
      return "Hello world!"
    },
  },
}

export default resolvers
