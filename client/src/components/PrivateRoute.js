import React from "react"
import { Link } from "gatsby"
import { Box, Button } from "@chakra-ui/core"
import { useAuth } from "./AuthContext"
import { COLORS } from "../utils/constants"

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [setMounted])

  if (!mounted) {
    return <Box p={16} h="100%" minH="100vh" bg="gray.100"></Box>
  } else if (!isAuthenticated) {
    return (
      <Box p={16} h="100%" minH="100vh" bg="gray.100">
        <Button as={Link} to="/login" variantColor={COLORS.primary}>
          Login
        </Button>
      </Box>
    )
  } else {
    return children
  }
}

export default PrivateRoute
