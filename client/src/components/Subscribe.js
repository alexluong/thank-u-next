import React from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/core"
import { COLORS } from "../utils/constants"

function Subscribe() {
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState("")
  const [isSent, setIsSent] = React.useState(null)

  function onSubmitEmail(e) {
    e.preventDefault()

    fetch(`${process.env.GATSBY_API_URL}/subscribe`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      if (res.status === 200) {
        setIsSent(true)
      } else {
        setError("There is an error adding your email to the list.")
      }
    })
  }

  return (
    <Box as="form" onSubmit={onSubmitEmail} maxW={350} w="100%" mx="auto">
      {isSent ? (
        <Alert status="success" borderRadius={8} my={4}>
          <AlertIcon />
          Thank you for your interest. We'd let you know as soon as we're ready.
        </Alert>
      ) : (
        <>
          <FormControl isInvalid={Boolean(error)}>
            <FormLabel d="none">Email</FormLabel>
            <Input
              placeholder="Email - e.g ari@grande.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              focusBorderColor={`${COLORS.primary}.500`}
              textAlign="center"
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          {/* {error && (
            <Alert status="error" borderRadius={8} my={4}>
              <AlertIcon />
              {error}
            </Alert>
          )} */}
          <Button variantColor={COLORS.primary} type="submit" mt={4} mb={4}>
            Join the Waitlist
          </Button>
        </>
      )}
    </Box>
  )
}

export default Subscribe
