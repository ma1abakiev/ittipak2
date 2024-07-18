import { ArticleList, RecomendationArticlesList } from '~widgets/article-list'
import { Intro } from '~widgets/intro'

export const HomePage = () => {
  return (
    <>
      <Intro></Intro>
      <div className="container mt-10 grid grid-cols-4">
        <div className='col-span-3'>
          <RecomendationArticlesList></RecomendationArticlesList>
          <ArticleList></ArticleList>
        </div>
        <div className='col-span-1'>Всем привет</div>
      </div>
    </>
  )
}
