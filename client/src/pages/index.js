import React from "react"
import { Link } from "gatsby"
import { Box, Button } from "@chakra-ui/core"
import { COLORS } from "../utils/constants"

function IndexPage() {
  return (
    <Box p={5}>
      <Button as={Link} to="/dashboard" variantColor={COLORS.primary}>
        Dashboard
      </Button>
    </Box>
  )
}

export default IndexPage
