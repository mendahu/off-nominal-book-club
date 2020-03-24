import Document, { Html, Head, Main, Nextscript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
  reddner() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <Nextscript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  }
}