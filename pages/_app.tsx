import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { lightTheme } from '../themes/ligth-theme'
import { UiProvider } from '../context/ui'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </UiProvider>
  )
}

export default MyApp
