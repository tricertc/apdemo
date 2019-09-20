import { NextPageContext } from 'next-server/dist/lib/utils'
import { Invoice } from 'xero-node/lib/AccountingAPI-models'
import DefaultLayout from '~components/layouts/DefaultLayout'
import PageHeader from '~components/PageHeader'
import { getAbsoluteUrl } from '~lib/helpers'

interface IPageProps {
  invoice: Invoice
}

/**
 * Invoice details page.
 *
 * @export
 * @returns
 */
export default function InvoiceDetailsPage (props: IPageProps) {
  return (
    <DefaultLayout>
      <PageHeader title="Invoice Details" />
      <pre>
        {JSON.stringify(props.invoice, null, 2)}
      </pre>
    </DefaultLayout>
  )
}

InvoiceDetailsPage.getInitialProps = async (ctx: NextPageContext): Promise<IPageProps> => {
  const url = getAbsoluteUrl(ctx, `/api/invoices/${ctx.query.id}`)

  const options: RequestInit = ctx.req ? {
    headers: {
      cookie: ctx.req.headers.cookie
    }
  } : {}

  return fetch(url, options)
    .then<Invoice>(res => res.json())
    .then<IPageProps>(invoice => ({ invoice }))
}
