import { Button, Card, Table } from 'react-bootstrap'
import { Invoice } from 'xero-node/lib/AccountingAPI-models'
import { formatAspNetDate } from '~lib/helpers/dates'

interface IProps {
  invoice: Invoice
  onCancel: () => void
}

/**
 * The selected invoice widget for the invoices page.
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export default function SelectedInvoice (props: IProps) {
  const { invoice } = props

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
        <Button variant="secondary" onClick={() => props.onCancel()}>
          Cancel
        </Button>{' '}
        <Button variant="primary">
          Pay Invoice
        </Button>
      </Card.Footer>
    </Card>
  )
}
