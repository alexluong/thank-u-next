import React from "react"
import { Link } from "gatsby"
import { Box, Button } from "@chakra-ui/core"
import TwitterIcon from "../components/TwitterIcon"
import Auth from "../components/Auth"
import { useAuth } from "../components/AuthContext"
import { COLORS } from "../utils/constants"

function IndexPage() {
  const { isAuthenticated } = useAuth()

  return (
    <Box p={5}>
      {isAuthenticated ? (
        <Button as={Link} to="/dashboard" variantColor={COLORS.primary}>
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
  )
}

export default IndexPage
