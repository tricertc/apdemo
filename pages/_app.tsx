import App from 'next/app'
import Head from 'next/head'
import { AuthContextProvider } from '~components/stores/AuthContext'

const THEME = process.env.BOOTSWATCH_THEME || 'sketchy'

/**
 * Adds global stylesheet and context providers to all pages.
 *
 * @export
 * @class CustomApp
 * @extends {App}
 */
export default class CustomApp extends App {
  /**
   * Render the component.
   *
   * @returns
   * @memberof CustomApp
   */
  public render () {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href={`https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.3.1/${THEME}/bootstrap.min.css`}
          />
        </Head>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </>
    )
  }
}
