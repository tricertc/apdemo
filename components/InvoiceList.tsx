import { Table } from 'react-bootstrap'
import { Invoice } from 'xero-node/lib/AccountingAPI-models'
import { formatAspNetDate } from '~lib/helpers/dates'
import useWorkflow from '~lib/hooks/use-workflow'

interface IProps {
  invoices: Invoice[]
}

/**
 * Display a list of invoices
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export default function InvoiceList (props: IProps) {
  const { selectInvoice } = useWorkflow()

  if (!props.invoices || !props.invoices.length) {
    return <p>No invoices</p>
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
          <tr key={invoice.InvoiceID} style={{ cursor: 'pointer' }} onClick={() => selectInvoice(invoice.InvoiceID)}>
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
