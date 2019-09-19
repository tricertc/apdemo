import { useEffect } from 'react'
import useAuth from '~lib/hooks/use-auth'

/**
 * A page to invoke the logout function.
 *
 * @export
 * @returns
 */
export default function LogoutPage () {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [])

  return null
}
