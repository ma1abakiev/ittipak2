import { GenericLayout, NakedLayout } from '~pages/layouts/index'
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from 'react-router-dom'
import { articlePageRoute } from '~pages/article/article-page.route'
import { homePageRoute } from '~pages/home/home-page.route'
import { loginPageRoute } from '~pages/login/login-page.route'
import { registerPageRoute } from '~pages/register/register-page.route'
import { pathKeys } from '~shared/lib/react-router'
import { page404Route } from '~pages/page-404/page-404.route'

function BubbleError() {
  const error = useRouteError()
  if (error) throw error
  return null
}

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <GenericLayout></GenericLayout>,
        children: [
          articlePageRoute,
          homePageRoute,
          loginPageRoute,
          registerPageRoute,
        ],
      },
      {
        element: <NakedLayout></NakedLayout>,
        children: [page404Route],
      },
      {
        loader: async () => redirect(pathKeys.page404()),
        path: '*',
      },
    ],
  },
])

export function BrowserRouter() {
  return <RouterProvider router={router} />
}
