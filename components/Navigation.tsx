import Link from 'next/link'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import useAuth from '~lib/hooks/use-auth'

interface INavLinkProps {
  href: string
  title: string
}

const NavLink = (props: INavLinkProps) => {
  // const active = window && props.href.startsWith(window.location.pathname)
  const active = true
  return (
    <Link href={props.href}>
      <a className={active ? 'nav-link active' : 'nav-link'}>
        {props.title}
      </a>
    </Link>
  )
}

/**
 * The top bar navigation component.
 *
 * @export
 * @returns
 */
export default function Navigation () {
  const { logout } = useAuth()

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Link href="/dashboard">
        <a className="navbar-brand">AP Demo</a>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink href="/dashboard" title="Dashboard" />
          <a href="#" className="nav-link" onClick={logout}>
            Log out
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
