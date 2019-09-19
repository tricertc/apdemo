import { Button, Container, Jumbotron } from 'react-bootstrap'
import BaseLayout from '~components/layouts/BaseLayout'
import useAuth from '~lib/hooks/use-auth'

/**
 * The home page.
 *
 * @export
 * @returns
 */
export default function IndexPage () {
  const { connect } = useAuth()

  return (
    <BaseLayout>
      <Container>
        <Jumbotron>
          <h1>Accounts Payable Demo</h1>
          <p className="lead">
            Make payments on outstanding accounts payable balances.
          </p>
          <p>Feature include:</p>
          <ul>
            <li>Check printing and mailing service</li>
            <li>Electronic ACH payments</li>
            <li>Print your own checks</li>
          </ul>
          <div className="pt-3">
            <Button variant="primary" size="lg" onClick={connect}>
              Conect to Xero
            </Button>
          </div>
        </Jumbotron>
      </Container>
    </BaseLayout>
  )
}
