import { IConnectResult, ILoginRequest } from '~common/interfaces'
import { ApiHandler } from '~common/types'
import * as Xero from '~server/clients/xero-client'

/**
 * Get a request token and authorize url.
 */
const getConnectResult: ApiHandler = async (req, res) => {
  const client = Xero.getAnonymousClient()

  const requestToken = await client.oauth1Client.getRequestToken()
  const authorizeUrl = client.oauth1Client.buildAuthoriseUrl(requestToken)

  return res.json({ authorizeUrl, requestToken } as IConnectResult)
}

/**
 * Create an access token.
 */
const createAccessToken: ApiHandler = async (req, res) => {
  const client = Xero.getAnonymousClient()

  const { requestToken, oauthVerifier } = req.body as ILoginRequest
  const accessToken = await client.oauth1Client.swapRequestTokenforAccessToken(requestToken, oauthVerifier)

  return res.json(accessToken)
}

/**
 * Handle requests to /api/xero/connect.
 */
const handler: ApiHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      return getConnectResult(req, res)

    case 'POST':
      return createAccessToken(req, res)

    default:
      return res.status(404).end()
  }
}

export default handler
