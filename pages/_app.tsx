import App from "next/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BookClubUserProvider, useFetchUser } from "../lib/bookClubUser";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import SnackbarContext from "../src/contexts/SnackbarContext";
import {
  OnbcSnackbar,
  useSnackbar,
} from "../src/hooks/useSnackbar/useSnackbar";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#3e7493",
      },
      secondary: {
        main: "#bf5e56",
      },
      type: "dark",
    },
  });

  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();

  return (
    <BookClubUserProvider value={useFetchUser()}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="icon" href="/favicons/favicon-32.png" sizes="32x32" />
          <link rel="icon" href="/favicons/favicon-57.png" sizes="57x57" />
          <link rel="icon" href="/favicons/favicon-76.png" sizes="76x76" />
          <link rel="icon" href="/favicons/favicon-96.png" sizes="96x96" />
          <link rel="icon" href="/favicons/favicon-128.png" sizes="128x128" />
          <link rel="icon" href="/favicons/favicon-192.png" sizes="192x192" />
          <link rel="icon" href="/favicons/favicon-228.png" sizes="228x228" />

          <link
            rel="shortcut icon"
            sizes="196x196"
            href="/favicons/favicon-196.png"
          />

          <link
            rel="apple-touch-icon"
            href="/favicons/favicon-120.png"
            sizes="120x120"
          />
          <link
            rel="apple-touch-icon"
            href="path/to/favicon-152.png"
            sizes="152x152"
          />
          <link
            rel="apple-touch-icon"
            href="path/to/favicon-180.png"
            sizes="180x180"
          />

          <meta name="msapplication-TileColor" content="#434343" />
          <meta
            name="msapplication-TileImage"
            content="/favicons/favicon-144.png"
          />

          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />

          <meta
            property="og:url"
            content="https://books.offnominal.space"
            key="url"
          />
          <meta property="og:type" content="website" key="type" />
          <meta
            property="og:title"
            content="The Off-Nominal Book Club"
            key="title"
          />
          <meta
            property="og:description"
            content="Find the best recommendations for space-themed books, built by the space-loving Off-Nominal community."
            key="description"
          />
          <meta
            property="og:image"
            content="https://books.offnominal.space/onbc_social.png"
            key="image"
          />

          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitter_card"
          />
          <meta name="twitter:site" content="@offnom" key="site_handle" />
          <meta
            name="twitter:creator"
            content="@JakeOnOrbit"
            key="creator_handle"
          />
          <meta
            name="twitter:description"
            content="Find the best recommendations for space-themed books, built by the space-loving Off-Nominal community."
            key="twitter_description"
          />
          <meta
            name="twitter:title"
            content="The Off-Nominal Book Club"
            key="twitter_title"
          />
          <meta
            name="twitter:image"
            content="https://books.offnominal.space/onbc_social.png"
            key="twitter_image"
          />
          <meta
            name="twitter:image:alt"
            content="Off-Nominal Book Club Logo with space-themed book icons"
            key="twitter_image_alt"
          />

          <title>The Off-Nominal Book Club</title>
        </Head>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SnackbarContext.Provider value={triggerSnackbar}>
            <Component {...pageProps} />
            <OnbcSnackbar
              content={snackBarContent}
              closeSnackbar={closeSnackbar}
            />
          </SnackbarContext.Provider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </BookClubUserProvider>
  );
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

export default MyApp;
