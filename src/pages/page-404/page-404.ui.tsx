import { Link } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'

export const Page404 = () => {
  return (
    <>
      <h1>Page Not Found 404</h1>
      <Link to={pathKeys.home()}>Home</Link>
    </>
  )
}
