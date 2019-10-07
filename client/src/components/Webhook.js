import React from "react"
import PropTypes from "prop-types"
import { Heading, FormLabel, Switch } from "@chakra-ui/core"
import Card from "./Card"
import { COLORS } from "../utils/constants"

function Webhook({ isWebhookEnabled, toggleWebhook }) {
  return (
    <Card gridArea="webhook">
      <Heading as="h2" size="md" mb={4}>
        Filter
      </Heading>
      <FormLabel htmlFor="webhook">Enable Filter</FormLabel>
      <Switch
        id="webhook"
        color={COLORS.primary}
        value={isWebhookEnabled}
        isChecked={isWebhookEnabled}
        onChange={() => toggleWebhook()}
      />
    </Card>
  )
}

Webhook.propTypes = {
  isWebhookEnabled: PropTypes.bool.isRequired,
  toggleWebhook: PropTypes.func.isRequired,
}

export default Webhook
