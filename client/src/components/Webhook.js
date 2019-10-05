import React from "react"
import { Heading, FormLabel, Switch } from "@chakra-ui/core"
import Card from "./Card"
import { COLORS } from "../utils/constants"

function Webhook() {
  const [isEnabled, setIsEnabled] = React.useState(false)
  const toggleIsEnabled = () => setIsEnabled(!isEnabled)

  return (
    <Card gridArea="webhook">
      <Heading as="h2" size="md" mb={4}>
        Filter
      </Heading>
      <FormLabel htmlFor="webhook">Enable Filter</FormLabel>
      <Switch
        id="webhook"
        color={COLORS.primary}
        value={isEnabled}
        isChecked={isEnabled}
        onChange={toggleIsEnabled}
      />
    </Card>
  )
}

export default Webhook
