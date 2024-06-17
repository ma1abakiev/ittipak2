import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, CardActions } from '@mui/material'

import { Link } from 'react-router-dom'
import { articleQueries } from '~entities/article'
import { FavoriteButton } from '~features/article/favorite-button'
import { LikeButton } from '~features/article/like-button'
import { ShareButton } from '~features/article/share-button'
import { EditButton } from '~features/article/edit-button'
import { getCookie } from 'typescript-cookie'

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
      <>
        <Box className="grid grid-cols-3 gap-10 ">
          {articleData.data.results.map((article) => {
            return <ArticleCard key={article.id} {...article} />
          })}
        </Box>
      </>
    )
  }
}

const ArticleCard = ({ photo, title, subtitle, id, likes }) => {
  const isAuth = getCookie('access')

  return (
    <Card className=" flex flex-col justify-between  hover:scale-105 transition-all">
      <Link to={`article/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={photo}
            alt="green iguana"
            className="w-full h-[200px]"
          />
          <CardContent>
            <Typography variant="h5" component="div" className="color-black">
              {title}
            </Typography>
            {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
            <Typography variant="subtitle2" component="div">
              {' '}
              {subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <LikeButton
          like={{
            id: id,
            likeCount: likes.length,
            likes: likes,
          }}
        />

        <FavoriteButton id={id} />

        <ShareButton title={title} id={id} />

        {isAuth && <EditButton id={id}></EditButton>}
      </CardActions>
    </Card>
  )
}
