import { FavoriteArticlesList } from '~widgets/article-list'

export function FavoritesPage() {
  return (
    <div className="container">
      <h2 className="mt-14 mb-5 text-2xl font-bold text-center">
        Ваши избранные статьи
      </h2>
      <FavoriteArticlesList />
    </div>
  )
}
