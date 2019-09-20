import { NextPageContext } from 'next-server/dist/lib/utils'
import { ICheck } from '~common/interfaces'
import DefaultLayout from '~components/layouts/DefaultLayout'
import PageHeader from '~components/PageHeader'
import LobService from '~lib/services/lob-service'

interface IPageProps {
  check: ICheck
}

/**
 * Check details page.
 *
 * @export
 * @returns
 */
export default function CheckDetailsPage (props: IPageProps) {
  return (
    <DefaultLayout>
      <PageHeader title="Check Details" />
      <pre>
        {JSON.stringify(props.check, null, 2)}
      </pre>
    </DefaultLayout>
  )
}

CheckDetailsPage.getInitialProps = async (ctx: NextPageContext): Promise<IPageProps> => {
  const Lob = new LobService()
  const check = await Lob.getCheck(ctx.query.id as string)
  return { check }
}
