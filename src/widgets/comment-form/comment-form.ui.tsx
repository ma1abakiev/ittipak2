import { Button } from '@mui/material'
import {
  commentContracts,
  commentQueries,
  commentTypes,
} from '~entities/comment'
import { ErrorMessage, Formik, Form, useFormikContext, useField } from 'formik'
import { formikContract } from '~shared/lib/zod'
import { getCookie } from 'typescript-cookie'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type CommentFormProps = {
  id: number
}
type MyTextFieldProps = {
  name: string
  type?: string
}

const MyTextField: React.FC<MyTextFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField({ ...props, name })
  return (
    <>
      <textarea
        {...field}
        {...props}
        placeholder={useTranslation().t('commentForm.placeholder')}
        className="w-full h-[50px] overflow-auto mb-3 appearance-none border-none outline-none resize-none"
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

export function CommentForm({ id }: CommentFormProps) {
  const { t } = useTranslation()
  const {
    mutate: createComment,
    isPending,
    isError,
  } = commentQueries.useCreateCommentMutation(id)

  const initialData: commentTypes.CreateComment = {
    content: '',
    article: id,
  }

  const isAuth = getCookie('access')

  return (
    <>
      {!isAuth ? (
        <div className="max-w-[380px] h-[100%] border-l-4 border-pc-500 px-2 my-5">
          <Link className="underline text-second-100" to="/login">
            {t('commentForm.registerPrompt')}
          </Link>
          , {t('commentForm.commentPrompt')}
        </div>
      ) : (
        <div className="border max-w-[380px] min-h-[100px] border-pc-300 rounded p-2 flex flex-col mb-5">
          <Formik
            initialValues={initialData}
            validate={validateForm}
            onSubmit={(comment) => createComment({ comment })}
          >
            {() => (
              <Form className="flex flex-col">
                <fieldset disabled={isPending}>
                  <MyTextField name="content" type="text" />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <SubmitButton isPending={isPending} />
              </Form>
            )}
          </Formik>
          {isError && (
            <p className="text-center text-xs text-[red]">
              {t('commentForm.error')}
            </p>
          )}
        </div>
      )}
    </>
  )
}

function SubmitButton({ isPending }) {
  const { t } = useTranslation()
  const { isValidating, isValid } = useFormikContext()
  return (
    <Button
      variant="contained"
      size="small"
      type="submit"
      className="mb-2 bg-second-100 self-end"
      disabled={!isValid || isValidating || isPending}
    >
      {isPending ? t('commentForm.sending') : t('commentForm.submit')}
    </Button>
  )
}

const validateForm = formikContract(commentContracts.CreateCommentSchema)
