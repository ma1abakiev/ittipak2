import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  CircularProgress,
  IconButton,
  Paper,
} from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useNavigate } from 'react-router-dom'
import { articleQueries, articleTypes } from '~entities/article'
import { ShareButton } from '~features/article/share-button'
import { LikeButton } from '~features/article/like-button'
import { FavoriteButton } from '~features/article/favorite-button'
import { StatusMenu } from '~features/article/status-menu'
import { ArchiveButton } from '~features/article/archive-button'

import EditIcon from '@mui/icons-material/Edit'
import { AccessTimeFilled, Visibility } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { getCookie } from 'typescript-cookie'

const savedLanguage = getCookie('language')

dayjs.locale(savedLanguage)

export function WriterArticlesList() {
  const {
    data: articleData,
    isLoading,
    isSuccess,
    isError,
  } = articleQueries.useGetWriterArticle()

  if (isLoading) {
    return (
      <div>
        <CircularProgress className="w-[50px] mx-auto flex justify-center" />
        <p className="text-center mt-2">Загрузка статей...</p>
      </div>
    )
  }

  if (isError) {
    return <div className="my-20">Error fetching user data.</div>
  }

  const articles = articleData?.data?.articles

  return (
    <div className="flex flex-col mx-auto gap-5 w-full">
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
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/article/edit/${props.article.id}/`)
  }

  return (
    <Paper className="min-w-full max-w-full shadow-sm p-2 card">
      <div className="flex flex-col-reverse md:flex-row items-center md:justify-between">
        <CardContent className="md:p-[12px] p-2">
          <div className="flex justify-between items-center pb-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center gap-4 cursor-pointer">
                <StatusMenu initialStatus={props.article.status} />
              </div>
              <div className="flex items-center gap-3 mt-3 mx-3">
                <p className="text-md text-pc-400 text-sm ">
                  {dayjs(props.article.created)
                    .format('DD.MM.YYYY')
                    .toUpperCase()}
                </p>
                <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
                  <Visibility className="w-5" />
                  {props.article.viewCount}
                </p>
                <Tooltip title={t('read_time')}>
                  <p className="text-md text-pc-400  flex items-center gap-1 text-sm">
                    <AccessTimeFilled className="w-4" />
                    {props.article.readTime} {t('minute')}
                  </p>
                </Tooltip>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xl title duration-300">
              {props.article.title}
            </h4>
            <div className="pt-2 flex items-center gap-1">
              <LikeButton
                like={{
                  id: props.article.id,
                  likeCount: props.article.likeCount,
                  likes: props.article.likes,
                }}
              />
              <FavoriteButton id={props.article.id} />
              <ShareButton id={props.article.id} />
              <ArchiveButton id={props.article.id} />
              <Tooltip title={t('edit_btn')}>
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </CardContent>
        <CardMedia
          component="img"
          className="w-[95%] md:max-w-[250px] min-h-[130px] max-h-[130px] rounded md:mr-[12px] cursor-pointer"
          image={props.article.photo}
          alt={props.article.title}
          title={props.article.title}
        />
      </div>
    </Paper>
  )
}
