import App from 'next/app'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import "react-datepicker/dist/react-datepicker.css";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

function MyApp({ Component, pageProps }) {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#3e7493"
      },
      secondary: {
        main: "#bf5e56"
      },
      type: "dark"
    }
  })

  return (
    <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="icon" href="/favicons/favicon-32.png" sizes="32x32" />
          <link rel="icon" href="/favicons/favicon-57.png" sizes="57x57" />
          <link rel="icon" href="/favicons/favicon-76.png" sizes="76x76" />
          <link rel="icon" href="/favicons/favicon-96.png" sizes="96x96" />
          <link rel="icon" href="/favicons/favicon-128.png" sizes="128x128" />
          <link rel="icon" href="/favicons/favicon-192.png" sizes="192x192" />
          <link rel="icon" href="/favicons/favicon-228.png" sizes="228x228" />

          <link rel="shortcut icon" sizes="196x196" href="/favicons/favicon-196.png" />

          <link rel="apple-touch-icon" href="/favicons/favicon-120.png" sizes="120x120" />
          <link rel="apple-touch-icon" href="path/to/favicon-152.png" sizes="152x152" />
          <link rel="apple-touch-icon" href="path/to/favicon-180.png" sizes="180x180" />

          <meta name="msapplication-TileColor" content="#434343" />
          <meta name="msapplication-TileImage" content="/favicons/favicon-144.png" />

          <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
          <title>The Off-Nominal Book Club</title>
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>
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