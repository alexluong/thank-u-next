import React from "react"
import { navigate } from "gatsby"
import { Box, Button } from "@chakra-ui/core"
import { useAuth } from "../components/AuthContext"
import Auth from "../components/Auth"
import TwitterIcon from "../components/TwitterIcon"

function LoginPage() {
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated])

  return (
    <Box h="100%" minH="100vh" bg="gray.50" p={16}>
      <Auth>
        <Button color="#fff" bg="#1da1f2" _hover={{ bg: "#1a91da" }}>
          <TwitterIcon width={18} height={18} />
          <Box as="span" ml={3}>
            Sign in with Twitter
          </Box>
        </Button>
      </Auth>
    </Box>
  )
}

export default LoginPage
