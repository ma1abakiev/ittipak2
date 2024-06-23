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
import { sandboxPageRoute } from '~pages/sandbox'
import { favoritesPageRoute } from '~pages/favorites'
import { editPageRoute } from '~pages/edit'
import { aboutUsPageRoute } from '~pages/about-us'

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
          homePageRoute,
          articlePageRoute,
          profilePageRoute,
          sandboxPageRoute,
          favoritesPageRoute,
          editPageRoute,
          aboutUsPageRoute
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
