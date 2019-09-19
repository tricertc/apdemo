import DefaultLayout from '~components/layouts/DefaultLayout'
import useAuth from '~lib/hooks/use-auth'

/**
 * The user dashboard.
 *
 * @export
 * @returns
 */
export default function DashboardPage () {
  const { state } = useAuth()
  return (
    <DefaultLayout>
      <h1>Dashboard</h1>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </DefaultLayout>
  )
}
