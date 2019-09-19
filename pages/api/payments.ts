import moment from 'moment'
import { IRecordPaymentRequest } from '~common/interfaces'
import withXeroClient, { XeroApiHandler } from '~server/hocs/with-xero-client'

/**
 * Record a payment for an invoice.
 */
const recordPayment: XeroApiHandler = async (req, res) => {
  const request = req.body as IRecordPaymentRequest

  await req.xero.payments.create({
    Invoice: { InvoiceID: request.invoiceID },
    Account: { Code: request.accountCode },
    Amount: request.amount,
    Date: moment.utc().format('YYYY-MM-DD'),
    IsReconciled: true,
    Reference: `AP Demo Check #${request.checkNumber}`
  })

  return res.status(200).end()
}

/**
 * Handle requests to /api/payments
 *
 * @param req
 * @param res
 */
export default withXeroClient((req, res) => {
  switch (req.method) {
    case 'POST':
      return recordPayment(req, res)

    default:
      return res.status(404).end()
  }
})
