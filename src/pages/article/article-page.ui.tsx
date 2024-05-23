import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Checkbox, IconButton } from '@mui/material'
import {
  BookmarkAdd,
  BookmarkAdded,
  Favorite,
  Share,
} from '@mui/icons-material'
import { useState } from 'react'
import { articleQueries } from '~entities/article'

export const ArticlePage = () => {
  const { id } = useParams()
  const {
    data: articleData,
    isSuccess,
    isLoading,
    isError,
  } = articleQueries.useGetArticleDetail(Number(id))

  if (isLoading) {
    return <h4>Идёт загрузка Статьи</h4>
  }
  if (isError || !isSuccess || !articleData) {
    return <h4>Ошибка, статья не найдена</h4>
  }

  return (
    <>
      <ArticleCard {...articleData.data}></ArticleCard>
    </>
  )
}

const ArticleCard = ({ photo, title, subtitle }) => {
  const [likeIcon, setLikeIcon] = useState(false)

  return (
    <Card className="p-10">
      <CardMedia className="h-96" image={`${photo}`} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Checkbox
          icon={<Favorite />}
          checkedIcon={<Favorite className="text-uygur" />}
          checked={likeIcon}
          onClick={() => setLikeIcon((prev) => !prev)}
        />

        <Checkbox
          icon={<BookmarkAdd />}
          checkedIcon={<BookmarkAdded className="text-uygur" />}
          checked={likeIcon}
          onClick={() => setLikeIcon((prev) => !prev)}
        />
        <IconButton>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  )
}
