import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@mui/material'
import { ArticleList, RecomendationArticlesList } from '~widgets/article-list'
import { Intro } from '~widgets/intro'
import { useTranslation } from 'react-i18next'

export const HomePage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Intro />
      <div className="container mt-10 grid grid-cols-4 gap-10 lg-max:grid-cols-1 flex-col-reverse lg-max:justify-center lg-max:gap-0">
        <div className="col-span-3 lg-max:row-start-2">
          <RecomendationArticlesList />
          <ArticleList />
        </div>
        <div className="col-span-1 mt-20 lg-max:row-start-1 lg-max:my-5">
          <Paper elevation={0} className="sticky top-[100px] lg-max:static ">
            <CardMedia
              sx={{ height: 140 }}
              image="https://neiros.ru/images/b10a936e6fe5d5ca5355c058f79a57cf.png"
              title="Ittipak"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t('banner.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('banner.subtitle')}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{t('banner.button')}</Button>
            </CardActions>
          </Paper>
        </div>
      </div>
    </>
  )
}
