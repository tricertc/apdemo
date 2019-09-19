import { Button, Card, Table } from 'react-bootstrap'
import { formatAspNetDate } from '~lib/helpers/dates'
import useWorkflow from '~lib/hooks/use-workflow'

/**
 * The selected invoice widget for the invoices page.
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export default function SelectedInvoice () {
  const { state, deselectInvoice } = useWorkflow()
  const invoice = state.selectedInvoice

  if (!invoice) {
    return null
  }

  return (
    <Card>
      <Card.Header>
        <strong>{invoice.Contact.Name}</strong>
      </Card.Header>
      <Card.Body>
        <Table size="sm" borderless>
          <tbody>
            {invoice.InvoiceNumber && (
              <tr>
                <th>Invoice No</th>
                <td>{invoice.InvoiceNumber}</td>
              </tr>
            )}
            <tr>
              <th>Amount Due</th>
              <td>$ {invoice.AmountDue.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Due Date</th>
              <td>{formatAspNetDate(invoice.DueDate)}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="text-right">
        <Button variant="secondary" onClick={deselectInvoice}>
          Cancel
        </Button>{' '}
        <Button variant="primary">
          Pay Invoice
        </Button>
      </Card.Footer>
    </Card>
  )
}
