import { useContext } from 'react'
import AuthContext from '~components/stores/AuthContext'
import * as actions from '~lib/actions/auth-actions'

/**
 * Hook provides methods for interacting with authentication state.
 *
 * @export
 */
export default function useAuth () {
  const { state, dispatch } = useContext(AuthContext)

  return {
    state,
    connect: actions.connect(dispatch),
    login: actions.login(dispatch),
    logout: actions.logout(dispatch)
  }
}
