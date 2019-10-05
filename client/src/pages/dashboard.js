import React from "react"
import { Box, Grid } from "@chakra-ui/core"
import Webhook from "../components/Webhook"
import Whitelist from "../components/Whitelist"
import Messages from "../components/Messages"

function DashboardPage() {
  return (
    <Box p={5} w="100%" h="100%" minH="100vh" bg="gray.100">
      <Grid
        templateAreas="'webhook messages' 'whitelist messages' '. messages'"
        templateColumns="3fr 7fr"
      >
        <Webhook />
        <Whitelist />
        <Messages />
      </Grid>
    </Box>
  )
}

export default DashboardPage
