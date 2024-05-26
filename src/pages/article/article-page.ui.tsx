import {
  CardActions,
  CircularProgress,
  Container,
  Divider,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { articleQueries } from '~entities/article'
import { withSuspense } from '~shared/lib/react'
import { ArticleInfo } from '~widgets/article-info'
import { ArticleViewer } from '~widgets/article-viewer'
import { withErrorBoundary } from 'react-error-boundary'
import { ErrorHandler } from '~shared/ui/error'
import { CommentForm } from '~widgets/comment-form'
import { CommentList } from '~widgets/comment-list'
import { LikeButton } from '~features/article/like-button'
import { FavoriteButton } from '~features/article/favorite-button'
import { ShareButton } from '~features/article/share-button'

function Page() {
  const { id } = useParams()
  const [preLoad, setPreLoad] = useState(true)

  useEffect(() => {
    setPreLoad(false)
  }, [])

  const {
    data: articleData,
    isLoading,
    isError,
  } = articleQueries.useGetArticleDetail(parseInt(id))

  if (isLoading) {
    return (
      <div>
        <CircularProgress className="w-[50px] mt-20 mx-auto flex justify-center" />
        <p className="text-center mt-2">Загрузка статьи.</p>
      </div>
    )
  }

  if (isError || !articleData) {
    return <div className="my-20 text-center">Error fetching article data.</div>
  }
  return (
    <>
      <Container maxWidth="lg" className="mx-auto my-[65px] ">
        {articleData && (
          <div className="max-w-full md:max-w-[95%] bg-[white] px-2 md:px-5  mb-5">
            <ArticleInfo article={articleData.data} />
            <Divider />
            {preLoad ? (
              <div className="flex flex-col items-center gap-3 my-20">
                <CircularProgress />
                Загрузка...
              </div>
            ) : (
              <ArticleViewer body={articleData.data.body} />
            )}
          </div>
        )}
        <div>
          <CardActions>
            <LikeButton
              like={{
                id: articleData.data.id,
                likeCount: articleData.data.likes.length,
                likes: articleData.data.likes,
              }}
            />
            <FavoriteButton id={articleData.data.id} />

            <ShareButton
              title={articleData.data.title}
              id={articleData.data.id}
            />
          </CardActions>
        </div>

        <div className=" max-w-full md:max-w-[95%] bg-[white] px-2 py-5  md:p-5">
          <h3 className="font-bold text-2xl">Комментарии</h3>
          <CommentForm id={parseInt(id)} />
          <CommentList id={parseInt(id)} />
        </div>
      </Container>
    </>
  )
}

function Loader() {
  return <div className="my-20">loading...</div>
}
const SuspensedPage = withSuspense(Page, {
  fallback: <Loader />,
})

export const ArticlePage = withErrorBoundary(SuspensedPage, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
})
