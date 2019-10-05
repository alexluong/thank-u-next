import React from "react"
import { Heading, Button, List, ListItem } from "@chakra-ui/core"
import Card from "./Card"
import { COLORS } from "../utils/constants"

function Whitelist() {
  return (
    <Card gridArea="whitelist">
      <Heading as="h2" size="md" mb={4}>
        Whitelist
      </Heading>

      <List styleType="disc">
        {whitelist.map(user => (
          <ListItem key={user}>@{user}}</ListItem>
        ))}
      </List>

      <Button variant="outline" variantColor={COLORS.primary} mt={5}>
        Analyze
      </Button>
    </Card>
  )
}

export default Whitelist

const whitelist = ["helloworld", "superman", "tonystark", "hulk"]
