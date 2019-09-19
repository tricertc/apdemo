import withXeroClient, { XeroApiHandler } from '~server/hocs/with-xero-client'

/**
 * Get accounts payable invoices.
 */
const getInvoices: XeroApiHandler = async (req, res) => {
  const result = await req.xero.invoices.get({
    where: `Type=="ACCPAY"&&Status=="Authorised"`
  })

  return res.json(result.Invoices)
}

/**
 * Handle requests to the /api/invoices endpoint.
 */
export default withXeroClient(async (req, res) => {
  switch (req.method) {
    case 'GET':
      return getInvoices(req, res)

    default:
      return res.status(404).end()
  }
})
