import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Button, CardActionArea, CardActions } from '@mui/material'
import { Link } from 'react-router-dom'
import { articleQueries } from '~entities/article'
import { FavoriteButton } from '~features/article/favorite-button'
import { LikeButton } from '~features/article/like-button'
import { ShareButton } from '~features/article/share-button'
import { EditButton } from '~features/article/edit-button'
import { userQueries } from '~entities/user'

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

const ArticleCard = ({ photo, title, subtitle, id, likes, author }) => {
  const { data: userData } = userQueries.useLoginUserQuery()

  return (
    <Card className=" w-full ">
      <Box className="flex ">
        <Link to={`article/${id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={photo}
              alt="green iguana"
              className="min-w-[300px] max-w-[300px] min-h-[300px] max-h-[300px]"
            />
          </CardActionArea>
        </Link>

        <CardActions className="pl-5 flex flex-col  items-start">
          <div className="flex items-center gap-2 mt-3 ml-5">
            <Avatar
              alt={`${author.username} ${author.username}`}
              src={author.photo}
            />

            <div>
              <div className="text-bold">{author.username}</div>
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
          <div className="flex items-center justify-between mt-7">
            <div className="flex">
              <LikeButton
                like={{
                  id: id,
                  likeCount: likes.length,
                  likes: likes,
                }}
              />
              <ShareButton title={title} id={id} />
            </div>
            <div className="flex items-center">
              <FavoriteButton id={id} />
              {userData && userData.data.username == author.username && (
                <EditButton id={id}></EditButton>
              )}
            </div>
          </div>
        </CardActions>
      </Box>
    </Card>
  )
}
