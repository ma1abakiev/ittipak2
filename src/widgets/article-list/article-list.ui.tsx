import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardActions,
  Tooltip,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { articleQueries } from '~entities/article'
import { FavoriteButton } from '~features/article/favorite-button'
import { LikeButton } from '~features/article/like-button'
import { ShareButton } from '~features/article/share-button'
import { EditButton } from '~features/article/edit-button'
import { userQueries } from '~entities/user'
import dayjs from 'dayjs'
import { Visibility, AccessTimeFilled } from '@mui/icons-material/'

export const ArticleList = () => {
  const {
    data: articleData,
    isLoading,
    isError,
    isSuccess,
  } = articleQueries.useGetArticles()

  if (isLoading) {
    return <h1>Идёт загрузка Статей</h1>
  }
  if (isError) {
    return <h1>Произошла ошибка</h1>
  }

  if (isSuccess) {
    return (
      <section className="mt-20">
        <h2 className="text-center text-4xl">Лента</h2>
        <Box className="flex flex-col gap-y-10 mt-10">
          {articleData.data.results.map((article) => {
            return <ArticleCard key={article.id} {...article} />
          })}
        </Box>
      </section>
    )
  }
}

const ArticleCard = ({
  photo,
  title,
  subtitle,
  id,
  likes,
  author,
  created,
  viewCount,
  readTime,
}) => {
  const { data: userData } = userQueries.useLoginUserQuery()

  return (
    <Card className="w-full shadow-none">
      <Box className="flex lg-max:flex-col">
        <div className=" items-center gap-2 my-3 ml-5 hidden lg-max:flex">
          <Avatar
            alt={`${author.username} ${author.username}`}
            src={author.photo}
          />

          <div>
            <div className="text-bold">{author.username}</div>
          </div>
        </div>

        <Link to={`article/${id}`}>
          <CardActionArea className="relative h-full">
            <CardMedia
              component="img"
              image={photo}
              alt="green iguana"
              className="min-w-[300px] max-w-[300px] h-full object-cover lg-max:min-w-full lg-max:max-w-none lg-max:min-h-full lg-max:max-h-40 lg-max:object-cover "
            />
          </CardActionArea>
        </Link>

        <CardActions className="pl-5 flex flex-col w-full  items-start lg-max:pr-5">
          <div className="flex justify-between w-full xl-max:flex-col">
            <div className="flex items-center gap-2 mt-3 ml-5 lg-max:hidden">
              <Avatar
                alt={`${author.username} ${author.username}`}
                src={author.photo}
              />

              <div>
                <div className="text-bold">{author.username}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 mx-3">
              <p className="text-md text-pc-400 text-sm ">
                {dayjs(created).format('MMMM D, YYYY').toUpperCase()}
              </p>
              <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
                <Visibility className="w-5" />
                {viewCount}
              </p>
              <Tooltip title="Время чтения">
                <p className="text-md text-pc-400  flex items-center gap-1 text-sm">
                  <AccessTimeFilled className="w-4" />
                  {readTime} мин
                </p>
              </Tooltip>
            </div>
          </div>
          <Box className="mt-5">
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="subtitle2" component="div">
              {subtitle}
            </Typography>
          </Box>
          <Link to={`article/${id}`} className="mt-5 ">
            <Button variant="contained" className="bg-uygur">
              Читать дальше
            </Button>
          </Link>
          <div className="flex items-center justify-between mt-7 w-full lg-max:mb-3">
            <div className="flex">
              <LikeButton
                like={{
                  id: id,
                  likeCount: likes.length,
                  likes: likes,
                }}
              />
            </div>
            <div className="flex items-center">
              {userData && userData.data.username == author.username && (
                <EditButton id={id}></EditButton>
              )}
              <ShareButton title={title} id={id} />
              <FavoriteButton id={id} />
            </div>
          </div>
        </CardActions>
      </Box>
    </Card>
  )
}
