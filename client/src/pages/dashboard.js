import React from "react"
import { Grid } from "@chakra-ui/core"
import Layout from "../components/Layout"
import Webhook from "../components/Webhook"
import Whitelist from "../components/Whitelist"
import Messages from "../components/Messages"

function DashboardPage() {
  return (
    <Layout>
      <Grid
        templateAreas="'webhook messages' 'whitelist messages' '. messages'"
        templateColumns="3fr 7fr"
      >
        <Webhook />
        <Whitelist />
        <Messages />
      </Grid>
    </Layout>
  )
}

export default DashboardPage
