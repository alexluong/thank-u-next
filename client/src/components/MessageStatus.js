import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Box, Button, Heading, Text } from "@chakra-ui/core"
import Card from "./Card"
import { COLORS } from "../utils/constants"

function MessageStatus({ messageNumber }) {
  return (
    <Card mt={16}>
      <Heading as="h2" size="md" mb={4}>
        Status
      </Heading>
      <Text d="flex" alignContent="center">
        <Box as="span" mr="4">
          <Box as="b">{messageNumber}</Box> messages removed last month
        </Box>
        <Button
          as={Link}
          to="/messages"
          size="xs"
          variant="ghost"
          variantColor={COLORS.primary}
        >
          View all
        </Button>
      </Text>
    </Card>
  )
}

MessageStatus.propTypes = {
  messageNumber: PropTypes.number.isRequired,
}

export default MessageStatus
