import React from "react"
import PropTypes from "prop-types"
import { formatDistanceToNow } from "date-fns"
import {
  Heading,
  List,
  ListItem,
  Text,
  PseudoBox,
  Box,
  Flex,
  Badge,
} from "@chakra-ui/core"
import Card from "./Card"
import { COLORS } from "../utils/constants"

function ConversationList({ conversations, onConversationClick }) {
  return (
    <Card>
      <Heading as="h2" size="md" mb={4}>
        Deleted Messages
      </Heading>

      <List>
        {conversations.map((conversation, i) => (
          <PseudoBox
            key={conversation.id}
            as={ListItem}
            mx={-4}
            my={8}
            borderRadius={4}
            _hover={{ bg: "gray.100" }}
            _focusWithin={{ bg: "gray.100" }}
            onClick={() => onConversationClick(i)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                onConversationClick(i)
              }
            }}
            tabIndex="0"
          >
            <Box p={4} cursor="pointer">
              <Badge variantColor={COLORS.primary} fontSize="12px" mb={2}>
                {conversation.messages.length} message
                {conversation.messages.length > 1 ? "s" : ""}
              </Badge>
              <Flex justify="space-between" align="center" mb={2}>
                <Heading as="h3" size="sm">
                  @{conversation.fromUserName}
                </Heading>
                <Text fontSize="xs" color="gray.500" ml="4">
                  {formatDistanceToNow(
                    new Date(Number(conversation.messages[0].createdAt)),
                    {
                      addSuffix: true,
                    },
                  )}
                </Text>
              </Flex>
              <Text>{conversation.messages[0].message}</Text>
            </Box>
          </PseudoBox>
        ))}
      </List>
    </Card>
  )
}

ConversationList.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConversationClick: PropTypes.func.isRequired,
}

export default ConversationList
