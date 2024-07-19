import { Button, CircularProgress,  Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { articleQueries } from '~entities/article'
import { EditArticle } from '~widgets/edit-article'

export function EditPage() {
  const { id } = useParams()
  const articleId: number = parseInt(id)
  const {
    data: articleData,
    isSuccess,
    isLoading,
    isError,
  } = articleQueries.useGetArticleDetail(articleId)

  const [title, setTitle] = useState('')

  useEffect(() => {
    if (isSuccess && articleData) {
      setTitle(articleData.data.title)
    }
  }, [isSuccess])

  const [preLoad, setPreLoad] = useState(false)

  useEffect(() => {
    setPreLoad(true)
  }, [])

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const { mutate: updateArticle, isPending } =
    articleQueries.useUpdateArticle(id)

  const handleSubmit = async () => {
    try {
      const blocksString = localStorage.getItem(`editContent-${id}`)
      const blocks = blocksString ? JSON.parse(blocksString) : []

      let firstParagraphText = ''
      for (const block of blocks) {
        if (
          block.type === 'paragraph' &&
          block.content &&
          block.content.length > 0 &&
          block.content[0].text
        ) {
          firstParagraphText = block.content[0].text
          break
        }
      }

      const trimmedSubtitle = firstParagraphText.substring(0, 200).toString()
      const data = {
        title: title,
        id: id,
        subtitle: trimmedSubtitle,
        body: blocks,
      }

      await updateArticle({ data })
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return (
      <div>
        <CircularProgress className="w-[50px] mt-20 mx-auto flex justify-center" />
        <p className="text-center mt-2">Загрузка статьи.</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="my-20">
        <p className="text-center mt-2">Ошибка</p>
      </div>
    )
  }

  return (
    <div className="my-20 bg-[white] container ">
      <Paper elevation={10} className="p-10 ">
        {isSuccess && articleData && (
          <>
            <h2 className="text-center font-bold ">
              Редактирование метаданных
            </h2>
            <textarea
              className="w-full font-bold mb-3 text-[32px] text-pc-500 resize-none leading-8  outline-none max-h-[300px] mt-10"
              placeholder="ЗАГОЛОВОК"
              value={title}
              onChange={handleChangeTitle}
            />
            {preLoad && (
              <EditArticle id={articleId} body={articleData.data.body} />
            )}
            <div className="flex justify-end gap-5">
              {isPending ? (
                <Button variant="outlined" className="cursor-wait flex gap-2">
                  <CircularProgress size={20} />
                  Изменение данных...
                </Button>
              ) : (
                <Button variant="contained" onClick={handleSubmit}>
                  Отправить
                </Button>
              )}
            </div>
          </>
        )}
      </Paper>
    </div>
  )
}
