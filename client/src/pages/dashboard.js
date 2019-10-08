import React from "react"
import { useQuery, useMutation } from "urql"
import gql from "graphql-tag"
import { Text } from "@chakra-ui/core"
import Layout from "../components/Layout"
import Container from "../components/Container"
import Webhook from "../components/Webhook"
import MessageStatus from "../components/MessageStatus"

const dashboardViewQuery = gql`
  query {
    dashboardView {
      id
      isWebhookEnabled
    }
  }
`

const toggleWebhookMutation = gql`
  mutation toggleWebhook {
    toggleWebhook {
      id
      isWebhookEnabled
    }
  }
`

function DashboardPage() {
  const [res] = useQuery({ query: dashboardViewQuery })
  const [, toggleWebhook] = useMutation(toggleWebhookMutation)

  if (res.fetching) {
    return <Layout />
  }

  if (res.error) {
    console.log(res.error)
    return (
      <Layout>
        <Container>
          <Text>Error...</Text>
        </Container>
      </Layout>
    )
  }

  const { dashboardView } = res.data

  return (
    <Layout>
      <Container>
        <Webhook
          isWebhookEnabled={dashboardView.isWebhookEnabled}
          toggleWebhook={toggleWebhook}
        />
        <MessageStatus messageNumber={50} />
      </Container>
    </Layout>
  )
}

export default DashboardPage
