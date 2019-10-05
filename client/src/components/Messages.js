import React from "react"
import { Heading, List, ListItem, Text, PseudoBox, Box } from "@chakra-ui/core"
import Card from "./Card"

function Messages() {
  function onMessageClick(user) {
    console.log(user)
  }

  return (
    <Card gridArea="messages">
      <Heading as="h2" size="md" mb={4}>
        Messages
      </Heading>

      <List>
        {messages.map(user => (
          <PseudoBox
            key={user.username}
            as={ListItem}
            mx={-4}
            mb={4}
            borderRadius={4}
            _hover={{ bg: "gray.100" }}
            _focusWithin={{ bg: "gray.100" }}
            onClick={() => onMessageClick(user)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                onMessageClick(user)
              }
            }}
            tabIndex="0"
          >
            <Box p={4} cursor="pointer">
              <Text fontSize="sm">@{user.username}</Text>
              <Text>{user.messages[0].message}</Text>
            </Box>
          </PseudoBox>
        ))}
      </List>
    </Card>
  )
}

export default Messages

const messages = [
  {
    username: "baddude1",
    messages: [{ message: "Hello", timestamp: 1570261272990 }],
  },
  {
    username: "baddude2",
    messages: [{ message: "Hello", timestamp: 1570261272990 }],
  },
  {
    username: "baddude3",
    messages: [{ message: "Hello", timestamp: 1570261272990 }],
  },
  {
    username: "baddude4",
    messages: [{ message: "Hello", timestamp: 1570261272990 }],
  },
  {
    username: "baddude5",
    messages: [{ message: "Hello", timestamp: 1570261272990 }],
  },
]
