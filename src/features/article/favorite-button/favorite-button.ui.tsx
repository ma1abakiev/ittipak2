import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import { getCookie } from 'typescript-cookie'
import { articleQueries } from '~entities/article'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'
import { useTranslation } from 'react-i18next'

type FavoriteButtonProps = { id: number }

export function FavoriteButton(props: FavoriteButtonProps) {
  const { t } = useTranslation()
  const isAuth = getCookie('access')
  const navigate = useNavigate()

  const redirectToRegisterPage = () => {
    navigate(pathKeys.register())
  }

  const { mutate: saveFavorite, isPending } = articleQueries.useFavoriteArticle(
    props.id
  )
  const { data: favData } = articleQueries.useGetFavoriteArticles()

  const favoriteArticles = favData?.data?.favoriteArticles

  const handleSaveFavorite = useCallback(async () => {
    await saveFavorite()
  }, [saveFavorite])

  if (!isAuth) {
    return (
      <Tooltip title={t('favoriteButton.loginRequired')}>
        <span>
          <IconButton onClick={redirectToRegisterPage} aria-label={t('favoriteButton.addToFavorites')}>
            <BookmarkAddIcon />
          </IconButton>
        </span>
      </Tooltip>
    )
  }

  const isFavoritedPosts = favoriteArticles?.some(
    (post) => post.id === props.id
  )
  if (isPending) {
    return (
      <div className="p-1">
        <CircularProgress size={25} />
      </div>
    )
  }

  return (
    <Tooltip
      title={
        isFavoritedPosts
          ? t('favoriteButton.removeFromFavorites')
          : t('favoriteButton.addToFavorites')
      }
    >
      <IconButton onClick={handleSaveFavorite} aria-label={t('favoriteButton.addToFavorites')}>
        {isFavoritedPosts ? (
          <BookmarkAddedIcon className="text-uygur" />
        ) : (
          <BookmarkAddIcon className="hover:text-second-100" />
        )}
      </IconButton>
    </Tooltip>
  )
}
