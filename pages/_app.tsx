import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
      contrastText: '#fff',
    },
    info: {
      main: '#29b6f6',
      contrastText: '#fff',
    },
    success: {
      main: '#1bb978',
      contrastText: '#fff',
    },
    warning: {
      main: '#FED253',
      contrastText: '#fff',
    },
    error: {
      main: '#FF2C62',
      contrastText: '#fff',
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}

export default MyApp
