import { articleQueries } from '~entities/article'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'

export const RecomendationArticlesList = () => {
  const { t } = useTranslation()

  const {
    data: articleData,
    isLoading,
    isError,
    isSuccess,
  } = articleQueries.useGetArticles()

  if (isLoading) {
    return (
      <div>
        <CircularProgress className="w-[50px] mt-20 mx-auto flex justify-center" />
        <p className="text-center mt-2">{t('loading.article')}</p>
      </div>
    )
  }
  if (isError || !articleData) {
    return <div className="my-20 text-center">{t('error.fetchArticle')}</div>
  }
  const firstArticle = articleData.data.results[0]

  if (isSuccess) {
    return (
      <>
        <h2 className="text-center text-4xl mb-10">{t('recomendation')}</h2>
        <Link to={`article/${firstArticle.id}`}>
          <Card className="shadow-none">
            <CardActionArea className="grid grid-cols-2 lg-max:grid-cols-1">
              <CardMedia
                component="img"
                image={firstArticle.photo}
                alt={firstArticle.photo}
                className="w-full h-80 col-span-1 object-cover"
              />
              <CardContent className="col-span-1">
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  className="lg-max:text-center"
                >
                  {firstArticle.title}
                </Typography>
                <Typography variant="body2" className="lg-max:text-center">
                  {firstArticle.subtitle}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Marquee
          direction="left"
          speed={100}
          pauseOnHover={true}
          className="my-5 p-5"
        >
          {articleData.data.results.map((article, i) => {
            if (i <= 4 && i > 0) {
              return <RecomendationCard {...article} key={article.id} />
            }
          })}
        </Marquee>
      </>
    )
  }
}

export const RecomendationCard = ({ photo, title, id }) => {
  const { t } = useTranslation()
  return (
    <Link to={`article/${id}`}>
      <Card className="h-64 mx-10 w-52 shadow-none">
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
