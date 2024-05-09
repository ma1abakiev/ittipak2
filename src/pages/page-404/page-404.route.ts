import { createElement } from 'react'
import { pathKeys } from '~shared/lib/react-router'
import { Page404 } from '~pages/page-404/page-404.ui'
import { RouteObject } from 'react-router-dom'

export const page404Route: RouteObject = {
  path: pathKeys.page404(),
  element: createElement(Page404),
}
