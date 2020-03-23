import App from 'next/app'
import Head from 'next/head'
import useCookie from '../src/hooks/useCookie'
import { UserProvider } from '../src/UserContext'
import CssBaseline from '@material-ui/core/CssBaseline'

function MyApp({ Component, pageProps }) {

  const userFuncs = useCookie() 

  return (
    <UserProvider value={userFuncs}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </UserProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp