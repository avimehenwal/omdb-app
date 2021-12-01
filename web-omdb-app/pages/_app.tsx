import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp


/* To change behaviour for each page rendered by next.js
    1. Wrap Layout components
    2. Wrap PageLevelComponent with Providers (theme / data / auth etc)
    3. MyApp.getInitialProps to get authorization code
          avoid this pattern, as it causes every page to be served server-side
*/