import 'isomorphic-fetch'
import Router from 'next/router'
import { Invoice } from 'xero-node/lib/AccountingAPI-models'
import { ISendCheckRequest, ISendCheckResponse } from '~common/interfaces'
import { IRecordPaymentRequest } from '~common/interfaces'
import LobService from './lob-service'

/**
 * Pay an invoice by check.
 *
 * @export
 * @param {IInvoice} invoice
 * @param {string} bankAccount
 * @param {string} fromAddress
 */
export async function payInvoiceByCheck (invoice: Invoice, bankAccountId: string, fromAddressId: string) {
  const Lob = new LobService()
  const to = invoice.Contact.Addresses.filter(addr => addr.AddressType === 'STREET')[0]

  const checkRequest: ISendCheckRequest = {
    amount: invoice.AmountDue,
    bank_account: bankAccountId,
    from: fromAddressId,
    description: `For invoice #${invoice.InvoiceNumber}`,
    to: {
      name: invoice.Contact.Name,
      address_city: to.City,
      address_line1: to.AddressLine1,
      address_line2: to.AddressLine2,
      address_state: to.Region,
      address_zip: to.PostalCode
    },
    metadata: {
      invoiceID: invoice.InvoiceID
    }
  }

  const checkResult = await Lob.sendCheck(checkRequest)

  await fetch('/api/payments', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      accountCode: '090',
      amount: invoice.AmountDue,
      invoiceID: invoice.InvoiceID,
      checkNumber: checkResult.checkNumber
    } as IRecordPaymentRequest)
  })

  Router.push(`/checks/${checkResult.checkId}`)
}
