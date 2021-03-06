import { gql } from "apollo-server-express"

const typeDefs = gql`
  type Query {
    hello: String
    dashboardView: DashboardView
    messagesView: MessagesView
  }

  type Mutation {
    subscribe(email: String!): Boolean!
    toggleWebhook: DashboardView!
  }

  type DashboardView {
    id: ID!
    isWebhookEnabled: Boolean!
    numMessageLastWeek: Int!
  }

  type MessagesView {
    id: ID!
    conversations: [Conversation]!
  }

  type Conversation {
    id: ID!
    fromUserName: String!
    fromUserId: String!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    message: String!
    createdAt: String!
  }
`

export default typeDefs
