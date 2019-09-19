import { Container } from 'react-bootstrap'
import BaseLayout, { IBaseLayoutProps } from '~components/layouts/BaseLayout'
import Navigation from '~components/Navigation'

/**
 * The default layout for authenticated users.
 *
 * @export
 * @param {IBaseLayoutProps} props
 * @returns
 */
export default function DefaultLayout (props: IBaseLayoutProps) {
  return (
    <BaseLayout title={props.title}>
      <div className="mb-3">
        <Navigation />
      </div>
      <Container>
        {props.children}
      </Container>
    </BaseLayout>
  )
}
