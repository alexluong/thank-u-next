import React from "react"
import { useQuery, useMutation } from "urql"
import gql from "graphql-tag"
import { Grid, Text } from "@chakra-ui/core"
import Layout from "../components/Layout"
import Webhook from "../components/Webhook"
import Whitelist from "../components/Whitelist"
import Messages from "../components/Messages"

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
        <Text>Error...</Text>
      </Layout>
    )
  }

  const { dashboardView } = res.data

  return (
    <Layout>
      <Grid
        templateAreas="'webhook messages' 'whitelist messages' '. messages'"
        templateColumns="3fr 7fr"
      >
        <Webhook
          isWebhookEnabled={dashboardView.isWebhookEnabled}
          toggleWebhook={toggleWebhook}
        />
        <Whitelist />
        <Messages />
      </Grid>
    </Layout>
  )
}

export default DashboardPage
