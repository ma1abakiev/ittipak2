import { FavoriteArticlesList } from '~widgets/article-list'
import { useTranslation } from 'react-i18next'

export function FavoritesPage() {
  const { t } = useTranslation()

  return (
    <div className="container my-20">
      <h2 className="mt-14 mb-5 text-2xl font-bold text-center">
        {t('favoritePage.title')}
      </h2>
      <FavoriteArticlesList />
    </div>
  )
}
