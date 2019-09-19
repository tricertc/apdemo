import { createContext, Dispatch, useReducer } from 'react'
import { AuthAction } from '~lib/actions/auth-actions'
import authReducer, { IAuthState, initialState } from '~lib/reducers/auth-reducer'

interface IAuthContext {
  state: IAuthState
  dispatch: Dispatch<AuthAction>
}

const AuthContext = createContext<IAuthContext>(null)

interface IProps {
  children: React.ReactNode
}

/**
 * The authentication context provider.
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export function AuthContextProvider (props: IProps) {
  const [ state, dispatch ] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )

}

export default AuthContext
