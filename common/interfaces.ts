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

/**
 * Address record from LOB.
 *
 * @export
 * @interface IAddress
 */
export interface IAddress {
  id: string
  description: string
  name: string
  company: string
  address_line1: string
  address_line2?: string
  address_city: string
  address_state: string
  address_zip: string
}
/**
 * LOB bank account.
 */
export interface IBankAccount {
  id: string
  description: string
}

/**
 * An interface for recording a payment.
 *
 * @export
 * @interface IRecordPaymentRequest
 */
export interface IRecordPaymentRequest {
  accountCode: string
  invoiceID: string
  amount: number
  checkNumber: string
}

/**
 * Interface for a request to send a new check.
 *
 * @export
 * @interface ICheck
 */
export interface ISendCheckRequest {
  description: string
  bank_account: string
  to: {
    name: string
    address_line1: string
    address_line2?: string
    address_city: string
    address_state: string
    address_zip: string
  }
  from: string
  amount: number,
  metadata: {
    invoiceID: string
  }
}

/**
 * Response from sending a check.
 *
 * @export
 * @interface ISendCheckResponse
 */
export interface ISendCheckResponse {
  checkId: string
  checkNumber: string
}

interface IThumbnail {
  small: string
  medium: string
  large: string
}

/**
 * Check record from LOB.
 *
 * @export
 * @interface ICheck
 */
export interface ICheck {
  id: string
  description: string
  metadata: {
    invoiceID: string
  }
  check_number: number
  memo?: string
  amount: number
  message?: null
  url: string
  to: IAddress
  from: {
    id: string
    description: string
  }
  bank_account: {
    id: string
    description: string
  },
  thumbnails: IThumbnail[]
  mail_type: string
  send_date: Date
  expected_delivery_date: Date
}
