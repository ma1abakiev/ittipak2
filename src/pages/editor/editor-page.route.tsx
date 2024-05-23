import { createElement } from 'react'
import { RouteObject } from 'react-router-dom'
import { EditorPage } from './editor-page.ui'

export const editorPageRoute: RouteObject = {
  path: 'editor',
  element: createElement(EditorPage),
}
