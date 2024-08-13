import {
  CardContent,
  CardMedia,
  Tooltip,
  CircularProgress,
  Paper,
} from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { Link } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'
import { articleQueries, articleTypes } from '~entities/article'
import { LikeButton } from '~features/article/like-button'
import { FavoriteButton } from '~features/article/favorite-button'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import { EditButton } from '~features/article/edit-button'
import { userQueries } from '~entities/user'
import { useTranslation } from 'react-i18next'

dayjs.locale('ru')

export function FavoriteArticlesList() {
  const { t } = useTranslation()
  const {
    data: articleData,
    isLoading,
    isSuccess,
    isError,
  } = articleQueries.useGetFavoriteArticles()

  if (isLoading) {
    return (
      <div className="my-20">
        <CircularProgress className="w-[50px] mx-auto flex justify-center" />
        <p className="text-center mt-2">{t('favoritePage.error')}</p>
      </div>
    )
  }

  if (isError) {
    return <div className="my-20">{t('error')}</div>
  }

  const articles = articleData?.data?.favoriteArticles

  if (articles.length === 0) {
    return (
      <div className="text-center font-medium">
        {t('favoritePage.error')}
      </div>
    )
  }

  return (
    <div className="flex flex-col mx-auto gap-5 max-w-[90%]">
      {isSuccess &&
        articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
    </div>
  )
}

type ArticleCardProps = { article: articleTypes.Article }

function ArticleCard(props: ArticleCardProps) {
  const { t } = useTranslation()
  const { data: userData } = userQueries.useLoginUserQuery()

  return (
    <Paper
      elevation={10}
      className="min-w-full max-w-full  shadow-none p-2 card"
    >
      <div className="flex  justify-between md-max:flex-col-reverse">
        <CardContent className="p-[12px] ">
          <div className="flex justify-between items-center pb-3">
            <div className="flex  items-center gap-3">
              <div className="flex items-center gap-3">
                <p className="text-md text-pc-400 text-sm ">
                  {dayjs(props.article.created)
                    .format('MMMM D, YYYY')
                    .toUpperCase()}
                </p>
                <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
                  <VisibilityIcon className="w-5" />
                  {props.article.viewCount}
                </p>
                <Tooltip title={t('commentary.title')}>
                  <p className="text-md text-pc-400  flex items-center gap-1 text-sm">
                    <AccessTimeFilledIcon className="w-4" />
                    {props.article.readTime} {t('commentary.title')}
                  </p>
                </Tooltip>
              </div>
            </div>
          </div>
          <div>
            <Link
              className="card-info"
              to={pathKeys.article.byId({ id: props.article.id })}
            >
              <h4 className="font-bold text-xl title duration-300">
                {props.article.title}
              </h4>
              <p className="text-md text-pc-500 min-h-[70px]">
                {props.article.subtitle}...
              </p>
            </Link>
            <div className="pt-2 flex items-center gap-1">
              <LikeButton
                like={{
                  id: props.article.id,
                  likeCount: props.article.likes.length,
                  likes: props.article.likes,
                }}
              />
              <FavoriteButton id={props.article.id} />
              {userData &&
                userData.data.username === props.article.author.username && (
                  <EditButton id={props.article.id}></EditButton>
                )}
            </div>
          </div>
        </CardContent>
        <CardMedia
          component="img"
          className="max-w-[250px] min-h-[230px] max-h-[230px] rounded mr-[12px] cursor-pointer  md-max:min-w-full"
          image={props.article.photo}
          alt={props.article.title}
          title={props.article.title}
        />
      </div>
    </Paper>
  )
}
