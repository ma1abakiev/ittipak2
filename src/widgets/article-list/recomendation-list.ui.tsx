import { Box, Paper } from '@mui/material'
import { articleQueries } from '~entities/article'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { Link } from 'react-router-dom'

export const RecomendationArticlesList = () => {
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
  const firstArticle = articleData.data.results[0]

  if (isSuccess) {
    return (
      <>
        <h2 className="text-center text-4xl mb-10">Рекомендации</h2>
        <Link to={`article/${firstArticle.id}`}>
          <Card>
            <CardActionArea className="grid grid-cols-2 ">
              <CardMedia
                component="img"
                image={firstArticle.photo}
                alt={firstArticle.photo}
                className="w-full h-80 col-span-1 object-cover"
              />
              <CardContent className="col-span-1">
                <Typography gutterBottom variant="h4" component="div">
                  {firstArticle.title}
                </Typography>
                <Typography variant="body2">{firstArticle.subtitle}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Box className="grid grid-cols-4 gap-10 mt-10">
          {articleData.data.results.map((article, i) => {
            if (i <= 4 && i > 0) {
              return <RecomendationCard {...article}></RecomendationCard>
            }
          })}
        </Box>
      </>
    )
  }
}

export const RecomendationCard = ({ photo, title, id }) => {
  return (
    <Link to={`article/${id}`}>
      <Card className="h-64">
        <CardActionArea className="flex flex-col">
          <CardMedia
            component="img"
            image={photo}
            alt={photo}
            className="w-[200px] h-[150px]"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              className="font-bold"
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
