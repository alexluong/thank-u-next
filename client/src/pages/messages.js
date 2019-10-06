import React from "react"
import { Link } from "gatsby"
import { Button } from "@chakra-ui/core"
import Layout from "../components/Layout"
import { COLORS } from "../utils/constants"

function MessagesPage() {
  return (
    <Layout>
      <Button as={Link} to="/dashboard" variantColor={COLORS.primary}>
        Dashboard
      </Button>
    </Layout>
  )
}

export default MessagesPage
