import jsCookie from 'js-cookie'
import { IAuthState } from '~lib/reducers/auth-reducer'

/**
 * Wrapper methods for managing the authentication state cookie.
 */
export const AuthCookie = {
  get: (): IAuthState => {
    return jsCookie.getJSON('authState')
  },
  set: (state: IAuthState): IAuthState => {
    jsCookie.set('authState', state)
    return state
  },
  clear: () => {
    jsCookie.remove('authState')
  }
}
