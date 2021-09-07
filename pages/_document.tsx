import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

// Not directly exported by NextJS (next/types). May change across versions.
import type { Enhancer, AppType } from 'next/dist/shared/lib/utils'

import { ServerStyleSheets } from '@ui/ssr'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className="text-gray-900 leading-tight">
        <Head>
          {/* Google fonts get automatically automized by Next.js: https://nextjs.org/blog/next-10-2#automatic-webfont-optimization */}
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="min-h-screen bg-gray-100 overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// Get Server Styles
// @see: https://material-ui.com/styles/advanced/#next-js
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  // eslint-disable-next-line react/display-name
  const enhanceApp: Enhancer<AppType> = (App) => (props) =>
    sheets.collect(<App {...props} />)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp,
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}

export default MyDocument
