import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {
  Box,
  CardActionArea,
  CardActions,
  Checkbox,
  IconButton,
} from '@mui/material'

import { Link } from 'react-router-dom'
import { Favorite, Share } from '@mui/icons-material'
import { useState } from 'react'
import { articleQueries } from '~entities/article'
import { FavoriteButton } from '~features/article/favorite-button'
import { LikeButton } from '~features/article/like-button'

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
        <Box className="flex justify-center flex-wrap gap-x-8 gap-y-5">
          {articleData.data.results.map((article) => {
            return <ArticleCard key={article.id} {...article} />
          })}
        </Box>
      </>
    )
  }
}

const ArticleCard = ({ photo, title, subtitle, id, likes }) => {
  const [likeIcon, setLikeIcon] = useState(false)

  return (
    <Card className="w-80 h-100 flex flex-col justify-between  hover:scale-105 transition-all">
      <Link to={`article/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={photo}
            alt="green iguana"
            className="w-full h-[250px]"
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
        {/* <Checkbox
          icon={<Favorite />}
          checkedIcon={<Favorite className="text-uygur" />}
          checked={likeIcon}
          onClick={() => setLikeIcon((prev) => !prev)}
        /> */}

        {/* <Checkbox
          icon={<BookmarkAdd />}
          checkedIcon={<BookmarkAdded className="text-uygur" />}
          checked={likeIcon}
          onClick={() => setLikeIcon((prev) => !prev)}
        /> */}

        <IconButton>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  )
}
