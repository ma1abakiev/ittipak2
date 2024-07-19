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

export const HomePage = () => {
  return (
    <>
      <Intro></Intro>
      <div className="container mt-10 grid grid-cols-4 gap-10">
        <div className="col-span-3">
          <RecomendationArticlesList></RecomendationArticlesList>
          <ArticleList></ArticleList>
        </div>
        <div className="col-span-1 mt-20">
          <Paper elevation={24} className="sticky top-[100px]">
            <CardMedia
              sx={{ height: 140 }}
              image="https://neiros.ru/images/b10a936e6fe5d5ca5355c058f79a57cf.png"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                БАННЕР
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ЗДЕСЬ МОГЛА БЫТЬ ВАША РЕКЛАМА
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Заказать</Button>
            </CardActions>
          </Paper>
        </div>
      </div>
    </>
  )
}
