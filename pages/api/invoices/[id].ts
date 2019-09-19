import withXeroClient, { XeroApiHandler } from '~server/hocs/with-xero-client'

/**
 * Get accounts payable invoices.
 */
const getInvoice: XeroApiHandler = async (req, res) => {
  const result = await req.xero.invoices.get({
    InvoiceID: req.query.id as string
  })

  return res.json(result.Invoices[0])
}

/**
 * Handle requests to the /api/invoices endpoint.
 */
export default withXeroClient(async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getInvoice(req, res)

    default:
      return res.status(404).end()
  }
})
