import { ArticleList } from '~widgets/article-list'
import { Intro } from '~widgets/intro'

export const HomePage = () => {
  return (
    <>
      <Intro></Intro>
      <div className="container mt-10">
        <ArticleList></ArticleList>
      </div>
    </>
  )
}
