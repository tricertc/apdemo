import { AccountingAPIClient } from 'xero-node'
import { XeroClientConfiguration } from 'xero-node/lib/internals/BaseAPIClient'

const config: XeroClientConfiguration = {
  appType: 'public',
  callbackUrl: process.env.XERO_CALLBACK_URL,
  consumerKey: process.env.XERO_CONSUMER_KEY,
  consumerSecret: process.env.XERO_CONSUMER_SECRET
}

/**
 * Get a xero accounting client for anonymous users.
 *
 * @export
 * @returns {AccountingAPIClient}
 */
export function getAnonymousClient (): AccountingAPIClient {
  return new AccountingAPIClient(config)
}
