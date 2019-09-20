import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import useAuth from '~lib/hooks/use-auth'

interface INavLinkProps {
  href: string
  title: string
}

const NavLink = (props: INavLinkProps) => {
  const[active, setActive] = useState<boolean>(false)

  useEffect(() => {
    setActive(props.href.startsWith(window.location.pathname))
  }, [])

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
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Link href="/invoices">
        <a className="navbar-brand">AP Demo</a>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink href="/invoices" title="Invoices" />
          <NavLink href="/checks" title="Checks" />
          <NavLink href="/logout" title="Log out" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
