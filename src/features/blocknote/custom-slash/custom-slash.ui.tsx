import {
  DefaultReactSuggestionItem,
  SuggestionMenuProps,
} from '@blocknote/react'
import { Paper } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

function getTranslatedText(title: string, t: (key: string) => string): string {
  switch (title) {
    case 'Heading 1':
      return t('heading_1')
    case 'Heading 2':
      return t('heading_2')
    case 'Heading 3':
      return t('heading_3')
    case 'Numbered List':
      return t('numbered_list')
    case 'Bullet List':
      return t('bullet_list')
    case 'Paragraph':
      return t('paragraph')
    case 'Table':
      return t('table')
    case 'Image':
      return t('image')
    case 'Video':
      return t('video')
    case 'Audio':
      return t('audio')
    case 'Check List':
      return t('check_list')
    case 'File':
      return t('file')
    default:
      return title
  }
}

export function CustomSlashMenu(
  props: SuggestionMenuProps<DefaultReactSuggestionItem>
) {
  const menuRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation() // useTranslation вызван непосредственно в компоненте

  useEffect(() => {
    if (props.selectedIndex !== undefined && menuRef.current) {
      const selectedElement = menuRef.current.childNodes[
        props.selectedIndex
      ] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    }
  }, [props.selectedIndex])

  return (
    <Paper
      elevation={2}
      className="slash-menu bg-green max-h-48 overflow-y-auto "
      ref={menuRef}
    >
      {props.items.map((item, index) => (
        <div
          key={index}
          className={`slash-menu-item border-b border-b-uygur p-3  cursor-pointer bg-white hover:bg-uygur ${
            props.selectedIndex === index ? 'selected bg-uygur/25' : ''
          }`}
          onClick={() => {
            props.onItemClick?.(item)
          }}
        >
          <div className="flex items-center gap-2">
            <div className="bg-uygur p-1 rounded slash-icon text-[white]">
              {item.icon}
            </div>
            <div className="text-md text-sm font-medium font-serif">
              {getTranslatedText(item.title, t)}
            </div>
          </div>
        </div>
      ))}
    </Paper>
  )
}
