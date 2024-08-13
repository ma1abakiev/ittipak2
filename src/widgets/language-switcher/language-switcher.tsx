import { setLanguage, getLanguage } from '~shared/lib/i18n/i18nHelper'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Typography from '@mui/material/Typography'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    const savedLanguage = getLanguage()
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  const handleLanguageChange = (lng: string) => {
    setLanguage(lng)
    window.location.reload() // Перезагружаем страницу после смены языка
  }

  return (
    <div className="flex justify-end space-x-4 container">
      {' '}
      {/* Центрирование и отступы между словами */}
      <Typography
        variant="body1"
        className="cursor-pointer text-black hover:text-gray-700"
        onClick={() => handleLanguageChange('ru')}
      >
        Русский
      </Typography>
      <Typography
        variant="body1"
        className="cursor-pointer text-black hover:text-gray-700"
        onClick={() => handleLanguageChange('en')}
      >
        English
      </Typography>
      <Typography
        variant="body1"
        className="cursor-pointer text-black hover:text-gray-700"
        onClick={() => handleLanguageChange('ug')}
      >
        ئۇيغۇر
      </Typography>
    </div>
  )
}
