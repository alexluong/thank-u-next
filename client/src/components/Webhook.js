import React from "react"
import PropTypes from "prop-types"
import { Heading, FormLabel, Switch, Text, Code, Alert } from "@chakra-ui/core"
import Card from "./Card"
import { COLORS } from "../utils/constants"

function Webhook({ isWebhookEnabled, toggleWebhook }) {
  return (
    <Card>
      <Heading as="h2" size="md" mb={4}>
        Twitter Filter
      </Heading>
      <FormLabel htmlFor="webhook">Enable Filter?</FormLabel>
      <Switch
        id="webhook"
        color={COLORS.primary}
        value={isWebhookEnabled}
        isChecked={isWebhookEnabled}
        onChange={() => toggleWebhook()}
      />
      <Text mt={4}>
        You can choose to turn on and off <Code>thank u, next</Code> whenever
        you want using this switch.
      </Text>

      {!isWebhookEnabled && (
        <Alert borderRadius={6} mt={8} bg="pink.100">
          Your Twitter messages are not filtered at the moment. Please turn the
          switch on if you want to use the filter.
        </Alert>
      )}
    </Card>
  )
}

Webhook.propTypes = {
  isWebhookEnabled: PropTypes.bool.isRequired,
  toggleWebhook: PropTypes.func.isRequired,
}

export default Webhook
