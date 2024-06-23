import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Button, CardActionArea, CardActions } from '@mui/material'
import { Link } from 'react-router-dom'
import { articleQueries } from '~entities/article'
import { FavoriteButton } from '~features/article/favorite-button'
import { LikeButton } from '~features/article/like-button'
import { ShareButton } from '~features/article/share-button'
import { EditButton } from '~features/article/edit-button'
import { getCookie } from 'typescript-cookie'
import { userQueries } from '~entities/user'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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
        <h2 className="text-center text-4xl">Лента</h2>
        <Box className="grid grid-cols-2 gap-x-10 gap-y-10 mt-10 p-10">
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
  // const { data: userData } = userQueries.useLoginUserQuery()

  return (
    <Card className=" flex flex-col justify-between gap-2  hover:scale-105 transition-all p-5">
      <div className="flex items-center gap-2">
        {/* <Avatar
          alt={`${userData.data.firstName} ${userData.data.lastName}`}
          src={userData.data.photo}
        />

        <div>
          <div className='text-bold'>{userData.data.username}</div>
        </div> */}
      </div>
      <Link to={`article/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={photo}
            alt="green iguana"
            className="w-full h-[300px]"
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
      <Link to={`article/${id}`}>
        <Button variant="contained" className="bg-uygur">
          Читать дальше
        </Button>
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
