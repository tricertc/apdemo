import Router from 'next/router'
import { Dropdown, DropdownButton, Table } from 'react-bootstrap'
import { ICheck } from '~common/interfaces'
import DefaultLayout from '~components/layouts/DefaultLayout'
import PageHeader from '~components/PageHeader'
import { formatDate } from '~lib/helpers/dates'
import LobService from '~lib/services/lob-service'

interface IPageProps {
  checks: ICheck[]
}

/**
 * Check listing page.
 *
 * @export
 * @returns
 */
export default function CheckListingPage (props: IPageProps) {
  if (!props.checks) {
    return <p>You haven't created any checks yet.</p>
  }

  return (
    <DefaultLayout>
      <PageHeader title="Checks" />
      <Table>
        <thead>
          <tr>
            <th>Check #</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.checks.map(check => (
            <tr key={check.id}>
              <td>{check.check_number}</td>
              <td>{check.to.name}</td>
              <td>$ {check.amount.toFixed(2)}</td>
              <td>{formatDate(check.send_date)}</td>
              <td>
                <DropdownButton id={`view-button-${check.id}`} title="View" size="sm" variant="outline-primary">
                  {check.metadata.invoiceID && (
                    <Dropdown.Item onClick={() => Router.push(`/invoices/${check.metadata.invoiceID}`)}>
                      Original Invoice
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={() => Router.push(`/checks/${check.id}`)}>
                    Details
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => window.open(check.url, '_blank')}>
                    Proof
                  </Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DefaultLayout>
  )
}

CheckListingPage.getInitialProps = async (): Promise<IPageProps> => {
  const Lob = new LobService()
  const checks = await Lob.getChecks()
  return { checks }
}
