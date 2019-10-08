import React from "react"
import { Link, navigate } from "gatsby"
import {
  Box,
  Flex,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core"
import { useAuth } from "./AuthContext"
import { COLORS, MAX_CONTAINER_WIDTH } from "../utils/constants"

function Navigation() {
  const { username, signOut } = useAuth()

  function signOutAndNavigate() {
    signOut()
    navigate("/")
  }

  return (
    <Box px={[8, 12, 16, 24]} py={6}>
      <Flex
        align={["start", "start", "center"]}
        justify="space-between"
        direction={["column", "column", "row"]}
        maxW={MAX_CONTAINER_WIDTH}
        w="100%"
        mx="auto"
      >
        <Link to="/dashboard">
          <Heading as="h1" size="md" display="block" mb={[4, 4, 0]}>
            thank u, next
          </Heading>
        </Link>
        <Flex
          align="center"
          justify="start"
          direction={["column-reverse", "column-reverse", "row"]}
        >
          <Button
            as={Link}
            to="/dashboard"
            variant="ghost"
            variantColor={COLORS.primary}
            display={["none", "none", "inline-flex"]}
            mr={2}
          >
            Dashboard
          </Button>
          <Button
            as={Link}
            to="/messages"
            variant="ghost"
            variantColor={COLORS.primary}
            display={["none", "none", "inline-flex"]}
            mr={2}
          >
            Messages
          </Button>

          <Menu>
            <MenuButton as={Button} rightIcon="chevron-down" mb={[4, 4, 0]}>
              @{username}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={signOutAndNavigate}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navigation
