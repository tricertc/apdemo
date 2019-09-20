import 'isomorphic-fetch'
import Router from 'next/router'
import { Dispatch } from 'react'
import { AccessToken, RequestToken } from 'xero-node/lib/internals/OAuth1HttpClient'
import { IAction, IConnectResult, IErrorAction, ILoginRequest } from '~common/interfaces'
import { handleErrors } from '~lib/helpers'

interface IConnectAction extends IAction {
  type: 'connect'
  requestToken: RequestToken
}

interface ILoginAction extends IAction {
  type: 'login'
  accessToken: AccessToken
}

interface ILogoutAction extends IAction {
  type: 'logout'
}

/**
 * Authentication actions.
 */
export type AuthAction = ILogoutAction | ILoginAction | IConnectAction | IErrorAction

/**
 * Initialize oauth login.
 */
export const connect = (dispatch: Dispatch<IConnectAction|IErrorAction>) => () => {
  fetch('/api/xero/connect')
    .then(handleErrors)
    .then<IConnectResult>(res => res.json())
    .then(result => {
      dispatch({ type: 'connect', requestToken: result.requestToken })
      window.location.href = result.authorizeUrl
    })
    .catch((err: Error) => {
      dispatch({ type: 'error', message: err.message })
    })
}

/**
 * Log in to Xero.
 */
export const login = (dispatch: Dispatch<ILoginAction|IErrorAction>) =>
  (requestToken: RequestToken, oauthVerifier: string) => {
    fetch('/api/xero/connect', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ requestToken, oauthVerifier } as ILoginRequest)
    })
    .then(handleErrors)
    .then<AccessToken>(res => res.json())
    .then(accessToken => {
      dispatch({ type: 'login', accessToken })
      Router.replace('/invoices')
    })
    .catch((err: Error) => {
      dispatch({ type: 'error', message: err.message })
    })
  }

/**
 * Log out of Xero.
 */
export const logout = (dispatch: Dispatch<ILogoutAction>) => () => {
  dispatch({ type: 'logout' })
  Router.replace('/')
}
