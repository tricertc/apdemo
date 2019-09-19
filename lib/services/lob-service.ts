import 'isomorphic-fetch'
import urlJoin from 'url-join'
import { IAddress, IBankAccount, ISendCheckRequest, ISendCheckResponse } from '~common/interfaces'

const BASE_URL = 'https://api.lob.com/v1/'
const { LOB_SECRET_KEY } = process.env

/**
 * LOB.com service client.
 *
 * @export
 * @class LobService
 */
export default class LobService {
  private authToken: string

  constructor () {
    this.authToken = Buffer.from(`${LOB_SECRET_KEY}:`).toString('base64')
  }

  /**
   * Get a list of addresses.
   *
   * @returns {Promise<IAddress[]>}
   * @memberof LobService
   */
  public async getAddresses (): Promise<IAddress[]> {
    return fetch(urlJoin(BASE_URL, 'addresses'), {
      headers: {
        Authorization: `Basic ${this.authToken}`
      }
    })
      .then(res => res.json())
      .then<IAddress[]>(result => result.data)
  }

  /**
   * Get a list of bank accounts.
   *
   * @returns {Promise<IBankAccount[]>}
   * @memberof LobService
   */
  public async getBankAccounts (): Promise<IBankAccount[]> {
    return fetch(urlJoin(BASE_URL, 'bank_accounts'), {
      headers: {
        Authorization: `Basic ${this.authToken}`
      }
    })
      .then(res => res.json())
      .then<IBankAccount[]>(result => result.data)
  }

  /**
   * Create and send a check
   *
   * @param {ISendCheckRequest} check
   * @returns {Promise<any>}
   * @memberof LobService
   */
  public async sendCheck (check: ISendCheckRequest): Promise<ISendCheckResponse> {
    return fetch(urlJoin(BASE_URL, 'checks'), {
      headers: {
        'Authorization': `Basic ${this.authToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(check)
    })
      .then(res => res.json())
      .then<ISendCheckResponse>(res => ({
        checkId: res.id,
        checkNumber: res.check_number
      }))
  }
}
