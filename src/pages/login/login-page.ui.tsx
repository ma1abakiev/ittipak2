import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import { userContracts, userQueries, userTypes } from '~entities/user'
import { Button, IconButton, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'
import { formikContract } from '~shared/lib/zod'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTranslation } from 'react-i18next'

export function LoginPage() {
  const { t } = useTranslation()
  const [visibility, setVisibility] = useState(false)

  const handleClickShowPassword = () =>
    setVisibility((visibility) => !visibility)

  const {
    mutate: loginToken,
    isPending,
    isError,
  } = userQueries.useGetTokenMutation()

  return (
    <div className="mt-[200px] bg-[white] w-[400px] border border-uygur mx-auto rounded-md px-5 py-7 lg-max:mt-[100px] md-max:w-[300px]">
      <h1 className="font-bold text-center text-2xl text-uygur">{t('login.title')}</h1>
      <Formik
        initialValues={initialUser}
        validate={validateForm}
        onSubmit={(user) => loginToken({ user })}
      >
        <Form>
          <fieldset disabled={isPending} className="text-xs text-[red]">
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="username"
                name="username"
                label={t('login.username')}
                size="small"
              />
              <ErrorMessage name="username" />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="password"
                name="password"
                label={t('login.password')}
                type={visibility ? 'text' : 'password'}
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="password-visibility"
                      size="small"
                      color="info"
                      onClick={handleClickShowPassword}
                    >
                      {visibility ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
              <ErrorMessage name="password" />
            </fieldset>
          </fieldset>
          {isPending ? t('login.sending') : <SubmitButton />}
        </Form>
      </Formik>
      {isError && (
        <p className="text-center text-xs text-[red]">
          {t('login.error')}
        </p>
      )}
      <Link
        className="mt-4 flex justify-center underline text-black"
        to={pathKeys.register()}
      >
        {t('login.register')}
      </Link>
    </div>
  )
}

const initialUser: userTypes.LoginUserDto = {
  username: '',
  password: '',
}

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext()
  const { t } = useTranslation()
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full mb-2 bg-second-100"
      disabled={!isValid || isValidating}
    >
      {t('login.submit')}
    </Button>
  )
}

const validateForm = formikContract(userContracts.LoginUserDtoSchema)
