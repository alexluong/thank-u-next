import React from "react"
import { useQuery } from "urql"
import gql from "graphql-tag"
import { Text } from "@chakra-ui/core"
import Layout from "../components/Layout"
import Container from "../components/Container"
import ConversationList from "../components/ConversationList"
import Conversation from "../components/Conversation"

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

function MessageListPage() {
  const [res] = useQuery({ query: messagesViewQuery })
  const [selectedConversation, setSelectedConversation] = React.useState(-1)

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

  function onConversationClick(index) {
    setSelectedConversation(index)
  }

  function back() {
    setSelectedConversation(-1)
  }

  return (
    <Layout>
      <Container>
        {selectedConversation === -1 ? (
          <ConversationList
            conversations={conversations}
            onConversationClick={onConversationClick}
          />
        ) : (
          <Conversation
            conversation={conversations[selectedConversation]}
            back={back}
          />
        )}
      </Container>
    </Layout>
  )
}

export default MessageListPage
