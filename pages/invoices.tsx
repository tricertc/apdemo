import 'isomorphic-fetch'

import { NextPageContext } from 'next-server/dist/lib/utils'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Invoice } from 'xero-node/lib/AccountingAPI-models'
import InvoiceList from '~components/InvoiceList'
import DefaultLayout from '~components/layouts/DefaultLayout'
import PageHeader from '~components/PageHeader'
import SelectedInvoice from '~components/SelectedInvoice'
import { getAbsoluteUrl } from '~lib/helpers'

interface IPageProps {
  invoices: Invoice[]
}

/**
 * Listing of authorized accounts payable invoices.
 *
 * @export
 * @returns
 */
export default function InvoicesPage (props: IPageProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>(null)

  return (
    <DefaultLayout>
      <PageHeader title="Outstanding Balances" />
      <Row>
        <Col md={8} sm={12}>
          <InvoiceList
            invoices={props.invoices}
            onSelect={(invoice: Invoice) => {
              setSelectedInvoice(invoice)
            }}
          />
        </Col>
        {selectedInvoice && (
          <Col md={4}>
            <SelectedInvoice
              invoice={selectedInvoice}
              onCancel={() => setSelectedInvoice(null)}
            />
          </Col>
        )}
      </Row>
    </DefaultLayout>
  )
}

InvoicesPage.getInitialProps = async (ctx: NextPageContext): Promise<IPageProps> => {
  const url = getAbsoluteUrl(ctx, '/api/invoices')

  const options: RequestInit = ctx.req ? {
    headers: {
      cookie: ctx.req.headers.cookie
    }
  } : {}

  return fetch(url, options)
    .then<Invoice[]>(res => res.json())
    .then<IPageProps>(invoices => ({ invoices }))
}
