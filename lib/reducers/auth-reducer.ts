import { AccessToken, RequestToken } from 'xero-node/lib/internals/OAuth1HttpClient'
import { AuthAction } from '~lib/actions/auth-actions'
import { AuthCookie } from '~lib/helpers/cookies'

/**
 * The authentication state interface.
 */
export interface IAuthState {
  accessToken: AccessToken
  requestToken: RequestToken
  error: string
}

/**
 * The default authentication state.
 */
export const initialState: IAuthState = AuthCookie.get() || {
  accessToken: null,
  requestToken: null,
  error: null
}

/**
 * The authentication state reducer.
 *
 * @export
 * @param {IAuthState} state
 * @param {*} action
 * @returns {IAuthState}
 */
export default function reducer (state: IAuthState, action: AuthAction): IAuthState {
  const nextState = { ...state }

  switch (action.type) {
    case 'connect':
      nextState.accessToken = null
      nextState.requestToken = action.requestToken
      nextState.error = null
      break

    case 'error':
      nextState.error = action.message
      break

    case 'login':
      nextState.accessToken = action.accessToken
      break

    case 'logout':
      nextState.accessToken = null
      nextState.requestToken = null
      break

    default:
      break
  }

  return AuthCookie.set(nextState)
}
