import { RequestToken } from 'xero-node/lib/internals/OAuth1HttpClient'

/**
 * Base reducer action.
 *
 * @export
 * @interface IAction
 */
export interface IAction {
  type: string
}

/**
 * Base error action.
 *
 * @export
 * @interface IErrorAction
 * @extends {IAction}
 */
export interface IErrorAction extends IAction {
  type: 'error'
  message: string
}

/**
 * Connect result.
 */
export interface IConnectResult {
  authorizeUrl: string
  requestToken: RequestToken
}

/**
 * Login request.
 *
 * @export
 * @interface ILoginRequest
 */
export interface ILoginRequest {
  requestToken: RequestToken
  oauthVerifier: string
}
