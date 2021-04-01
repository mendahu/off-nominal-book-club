import App from "next/app";
import type { AppProps } from "next/app";
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
import CommonHead from "../src/components/CommonHead/CommonHead";

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
        <CommonHead />
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
