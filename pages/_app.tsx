import { useMemo, createContext, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'

import { ThemeProvider, createTheme } from '@mui/material/styles'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
