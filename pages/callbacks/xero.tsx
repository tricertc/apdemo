import { NextPageContext } from 'next-server/dist/lib/utils'
import { useEffect } from 'react'
import useAuth from '~lib/hooks/use-auth'

interface IPageProps {
  oauthToken: string
  oauthVerifier: string
  org: string
}

/**
 * Handle callbacks from Xero's oauth login.
 *
 * @export
 * @param {IPageProps} props
 * @returns
 */
export default function XeroCallbackPage (props: IPageProps) {
  const { login, state } = useAuth()

  useEffect(() => {
    login(state.requestToken, props.oauthVerifier)
  }, [])

  return null
}

XeroCallbackPage.getInitialProps = (ctx: NextPageContext): IPageProps => {
  const { oauth_token, oauth_verifier, org } = ctx.query
  return {
    oauthToken: oauth_token.toString(),
    oauthVerifier: oauth_verifier.toString(),
    org: org.toString()
  }
}
