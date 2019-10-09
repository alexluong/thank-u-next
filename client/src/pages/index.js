import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Flex,
  Button,
  Link,
  List,
  ListItem,
  ListIcon,
  Textarea,
  Text,
  Heading,
} from "@chakra-ui/core"
import { Planet } from "react-kawaii"
import TwitterIcon from "../components/TwitterIcon"
import Auth from "../components/Auth"
import { useAuth } from "../components/AuthContext"
import { isNext } from "@tyn/thank-u-next"
import { COLORS } from "../utils/constants"

const MAX_WIDTH = 650

function IndexPage() {
  const { isAuthenticated } = useAuth()
  const [message, setMessage] = React.useState("")
  const [isHappy, setIsHappy] = React.useState(true)

  function onMessageTest() {
    if (isNext(message)) {
      setIsHappy(false)
    } else {
      setIsHappy(true)
    }
  }
  // background-color: #e899dc;
  // background-image: linear-gradient(315deg, #e899dc 0%, #d387ab 74%);
  return (
    <>
      <Box
        p={8}
        backgroundColor="#e899dc"
        backgroundImage="linear-gradient(315deg, #e899dc 0%, #d387ab 74%)"
      >
        <Box borderRadius={16} overflow="hidden">
          <Box as="header" textAlign="center" py={16} px={4} bg="white">
            <span
              as="span"
              role="img"
              aria-label="woman gesturing no"
              style={{ fontSize: 60 }}
            >
              🙅‍♀️
            </span>
            <Heading as="h1" color={`${COLORS.primary}.500`} mb={4}>
              thank u, next
            </Heading>
            <Heading as="h2" size="md" color={`${COLORS.primary}.400`} mb={8}>
              Twitter Direct Message Filter Against Harassment
            </Heading>
            {isAuthenticated ? (
              <Button
                as={GatsbyLink}
                to="/dashboard"
                variantColor={COLORS.primary}
              >
                Dashboard
              </Button>
            ) : (
              <Auth>
                <Button color="#fff" bg="#1da1f2" _hover={{ bg: "#1a91da" }}>
                  <TwitterIcon width={18} height={18} />
                  <Box as="span" ml={3}>
                    Sign in with Twitter
                  </Box>
                </Button>
              </Auth>
            )}
          </Box>

          <Box as="section" bg="white">
            <Box maxW={MAX_WIDTH} w="100%" mx="auto" px={4} py={16}>
              <Heading as="h2" size="md" mb={4}>
                How it works
              </Heading>

              <List spacing={3}>
                <ListItem>
                  <ListIcon icon="star" color={`${COLORS.primary}.400`} />
                  After signing in, we will construct a whitelist of users whose
                  messages won't be filtered based on the people you follow.
                </ListItem>
                <ListItem>
                  <ListIcon icon="email" color={`${COLORS.primary}.400`} />
                  In the future, anybody who receives a message from you will
                  also be added to the whitelist.
                </ListItem>
                <ListItem>
                  <ListIcon icon="chat" color={`${COLORS.primary}.400`} />
                  Whenever you receive a new message, it will go through our
                  algorithm to determine if the message is good or not.
                </ListItem>
                <ListItem>
                  <ListIcon icon="delete" color={`${COLORS.primary}.400`} />
                  Inappropriate messages will be removed from your inbox. If you
                  wish to, you can take a look at them in our application.
                </ListItem>
              </List>
            </Box>
          </Box>

          <Box as="section" py={16} px={4} textAlign="center" bg="white">
            <Box maxW={MAX_WIDTH} w="100%" mx="auto">
              <Heading as="h2" size="lg">
                Algorithm
              </Heading>

              <Flex justify="center" my={12}>
                <Planet
                  size={200}
                  mood={isHappy ? "excited" : "sad"}
                  color="#fed7e2"
                />
              </Flex>

              <Textarea
                placeholder="Try a test message - e.g. Hi"
                value={message}
                onChange={e => {
                  setMessage(e.target.value)
                  setIsHappy(true)
                }}
                maxW={350}
                mx="auto"
                mb={8}
              />

              <Button variantColor={COLORS.primary} onClick={onMessageTest}>
                Test
              </Button>
            </Box>
          </Box>

          <Box as="footer" pt={32} pb={4} px={4} bg="white" textAlign="center">
            <Box maxW={MAX_WIDTH} w="100%" mx="auto">
              <Text mb={2}>
                Made with{" "}
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                by{" "}
                <Link isExternal href="https://alexluong.com">
                  Alex Luong
                </Link>
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default IndexPage
