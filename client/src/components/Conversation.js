import React from "react"
import PropTypes from "prop-types"
import { formatDistanceToNow } from "date-fns"
import { Button, Heading, Text, Link, Icon } from "@chakra-ui/core"
import Card from "./Card"
import { COLORS } from "../utils/constants"

function Conversation({ conversation, back }) {
  const reversedMessageList = [...conversation.messages].reverse()

  return (
    <>
      <Button
        onClick={back}
        leftIcon="arrow-back"
        variant="outline"
        variantColor={COLORS.primary}
        mb={8}
      >
        Back
      </Button>
      <Card>
        <Heading as="h2" size="sm">
          <Link
            href={`https://twitter.com/${conversation.fromUserName}`}
            isExternal
            _hover={{
              textDecoration: "none",
              bg: "gray.100",
              p: 2,
              m: -2,
              borderRadius: 4,
            }}
            _focus={{
              textDecoration: "none",
              bg: "gray.100",
              p: 2,
              m: -2,
              borderRadius: 4,
            }}
          >
            @{conversation.fromUserName}
            <Icon name="external-link" ml="3" />
          </Link>
        </Heading>
      </Card>

      {reversedMessageList.map((message, i) => (
        <Card key={i} my={8} py={4}>
          <Text fontSize="sm" mb="2" color="gray.500">
            {formatDistanceToNow(new Date(Number(message.createdAt)), {
              addSuffix: true,
            })}
          </Text>
          <Text>{message.message}</Text>
        </Card>
      ))}
    </>
  )
}

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired,
}

export default Conversation
