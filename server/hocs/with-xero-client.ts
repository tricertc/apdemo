import { NextApiRequest, NextApiResponse } from 'next-server/dist/lib/utils'
import { AccountingAPIClient } from 'xero-node/lib/AccountingAPIClient'
import { IAuthState } from '~lib/reducers/auth-reducer'
import { getAuthenticatedClient } from '~server/clients/xero-client'

interface IXeroApiRequest extends NextApiRequest {
  xero: AccountingAPIClient
}

/**
 * An API handler with a Xero client attached to the request.
 */
export type XeroApiHandler = (
  req: IXeroApiRequest,
  res: NextApiResponse
) => Promise<void> | void

/**
 * Attaches the xero client to the request object.
 */
const enhancedHandler = (handler: XeroApiHandler) =>
  (req: IXeroApiRequest, res: NextApiResponse) => {
    const authState: IAuthState = JSON.parse(req.cookies.authState)

    req.xero = getAuthenticatedClient(authState.accessToken)

    return handler(req, res)
  }

export default enhancedHandler
