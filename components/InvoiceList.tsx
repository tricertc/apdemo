import { Table } from 'react-bootstrap'
import { Invoice } from 'xero-node/lib/AccountingAPI-models'
import { formatAspNetDate } from '~lib/helpers/dates'

interface IProps {
  invoices: Invoice[]
  onSelect?: (invoice: Invoice) => void
}

/**
 * Display a list of invoices
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export default function InvoiceList (props: IProps) {
  if (!props.invoices || !props.invoices.length) {
    return <p>No invoices</p>
  }

  const onSelect = (invoice: Invoice) => () => {
    if (props.onSelect !== null) {
      props.onSelect(invoice)
    }
  }

  return (
    <Table striped hover bordered>
      <thead>
        <tr>
          <th>Due</th>
          <th>Name</th>
          <th>Ref</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.invoices.map(invoice => (
          <tr key={invoice.InvoiceID} style={{ cursor: 'pointer' }} onClick={onSelect(invoice)}>
            <td>{formatAspNetDate(invoice.DueDate)}</td>
            <td>{invoice.Contact.Name}</td>
            <td>{invoice.InvoiceNumber}</td>
            <td>$ {invoice.AmountDue.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
