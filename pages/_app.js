import App from 'next/app'
import useCookie from '../src/hooks/useCookie'
import { UserProvider } from '../src/UserContext'
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {

  const userFuncs = useCookie() 

  return (
    <UserProvider value={userFuncs}>
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