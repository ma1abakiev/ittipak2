import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'
import { GenericLayout, IntroLayout, NakedLayout } from '~pages/layouts'
import { homePageRoute } from '~pages/home'
import { articlePageRoute } from '~pages/article'
import { loginPageRoute } from '~pages/login'
import { registerPageRoute } from '~pages/register'
import { page404Route } from '~pages/page-404'
import { verifyPageRoute } from '~pages/verify'
import { profilePageRoute } from '~pages/profile'
import { editorPageRoute } from '~pages/editor'

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
          profilePageRoute,
          editorPageRoute,
        ],
      },
      {
        element: <NakedLayout></NakedLayout>,
        children: [page404Route],
      },
      {
        element: <IntroLayout />,
        children: [registerPageRoute, loginPageRoute, verifyPageRoute],
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
