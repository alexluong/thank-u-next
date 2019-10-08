import React from "react"
import { Box } from "@chakra-ui/core"
import { MAX_CONTAINER_WIDTH } from "../utils/constants"

function Container(props) {
  return <Box maxW={MAX_CONTAINER_WIDTH} w="100%" mx="auto" {...props} />
}

export default Container
