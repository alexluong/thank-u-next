import { gql } from "apollo-server-express"

const typeDefs = gql`
  type Query {
    hello: String
    dashboardView: DashboardView
  }

  type Mutation {
    toggleWebhook: DashboardView!
  }

  type DashboardView {
    id: ID!
    isWebhookEnabled: Boolean!
  }
`

export default typeDefs
