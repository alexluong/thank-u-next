import React from "react"
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core"
import { AuthProvider } from "./components/AuthContext"

function Index({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CSSReset />
        <ColorModeProvider>{children}</ColorModeProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default Index
