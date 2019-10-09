import React from "react"
import { useQuery } from "urql"
import gql from "graphql-tag"
import { Heading, List, ListItem, Text, PseudoBox, Box } from "@chakra-ui/core"
import Layout from "../components/Layout"
import Container from "../components/Container"
import Card from "../components/Card"

const messagesViewQuery = gql`
  query {
    messagesView {
      id
      conversations {
        fromUserId
        fromUserName
        id
        messages {
          id
          message
          createdAt
        }
      }
    }
  }
`

function MessagesPage() {
  const [res] = useQuery({ query: messagesViewQuery })

  if (res.fetching) {
    return <Layout />
  }

  if (res.error) {
    console.log(res.error)
    return (
      <Layout>
        <Container>
          <Text>Error...</Text>
        </Container>
      </Layout>
    )
  }

  const {
    messagesView: { conversations },
  } = res.data

  function onConversationClick(conversation) {
    console.log(conversation)
  }

  return (
    <Layout>
      <Container>
        <Card>
          <Heading as="h2" size="md" mb={4}>
            Deleted Messages
          </Heading>

          <List>
            {conversations.map(conversation => (
              <PseudoBox
                key={conversation.id}
                as={ListItem}
                mx={-4}
                mb={4}
                borderRadius={4}
                _hover={{ bg: "gray.100" }}
                _focusWithin={{ bg: "gray.100" }}
                onClick={() => onConversationClick(conversation)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    onConversationClick(conversation)
                  }
                }}
                tabIndex="0"
              >
                <Box p={4} cursor="pointer">
                  <Text fontSize="sm">@{conversation.fromUserName}</Text>
                  <Text>{conversation.messages[0].message}</Text>
                </Box>
              </PseudoBox>
            ))}
          </List>
        </Card>
      </Container>
    </Layout>
  )
}

export default MessagesPage
