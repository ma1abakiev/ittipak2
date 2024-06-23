import { createElement } from 'react'
import { RouteObject } from 'react-router-dom'
import { AboutUsPage } from './about-us-page.ui'

export const aboutUsPageRoute: RouteObject = {
  path: 'aboutus',
  element: createElement(AboutUsPage),
}
