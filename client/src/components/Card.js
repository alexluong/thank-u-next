import React from "react"
import { Box } from "@chakra-ui/core"

function Card(props) {
  return <Box p={12} bg="white" borderRadius={8} {...props} />
}

export default Card
