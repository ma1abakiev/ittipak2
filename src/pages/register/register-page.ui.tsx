import {
  Formik,
  Form,
  ErrorMessage,
  useFormikContext,
  Field,
  FormikValues,
} from 'formik'
import { Button, IconButton, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'
import { userQueries, userTypes } from '~entities/user'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import { setCookie } from 'typescript-cookie'
import { useTranslation } from 'react-i18next'

const initialUser: userTypes.CreateUserSchema = {
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  password: '',
}

export function RegisterPage() {
  const { t } = useTranslation()
  const [visibility, setVisibility] = useState(false)
  const handleClickShowPassword = () =>
    setVisibility((visibility) => !visibility)

  function saveCredentialsToLocalStorage(username: string, password: string) {
    setCookie('username', username)
    setCookie('password', password)
  }

  const {
    mutate: registerUser,
    isPending,
    isError,
    isSuccess,
  } = userQueries.useRegisterMutation()

  if (isSuccess) {
    return (
      <div className="my-20 w-[400px] bg-[white] mx-auto rounded-md px-5 py-7 border border-sc-100">
        <h1 className="font-bold text-center text-2xl text-pc-500">
          {t('register.emailSent')}
        </h1>
      </div>
    )
  }

  return (
    <div className="mt-20 w-[400px] bg-[white] mx-auto rounded-md px-5 py-7 border border-uygur xl-max:mt-5 md-max:w-[300px]">
      <h1 className="font-bold text-center text-2xl text-uygur">
        {t('register.title')}
      </h1>
      <Formik
        initialValues={initialUser}
        validate={validateForm}
        onSubmit={(user) => {
          registerUser({ user })
          saveCredentialsToLocalStorage(user.username, user.password)
        }}
      >
        <Form>
          <fieldset disabled={isPending}>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="email"
                name="email"
                label={t('register.email')}
                size="small"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="username"
                name="username"
                label={t('register.username')}
                size="small"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="firstName"
                name="firstName"
                label={t('register.firstName')}
                size="small"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="lastName"
                name="lastName"
                size="small"
                label={t('register.lastName')}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="password"
                name="password"
                label={t('register.password')}
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
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label={t('register.confirmPassword')}
                type={visibility ? 'text' : 'password'}
                size="small"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
          </fieldset>
          <SubmitButton />
        </Form>
      </Formik>
      {isError && (
        <p className="text-center text-xs text-[red]">
          {t('register.error')}
        </p>
      )}
      <p className="flex justify-center gap-1">
        {t('register.haveAccount')}
        <Link className="underline text-second-100" to={pathKeys.login()}>
          {t('register.login')}
        </Link>
      </p>
    </div>
  )
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
      {t('register.submit')}
    </Button>
  )
}

const validateForm = (values) => {
  const errors: Partial<FormikValues> = {}

  if (!values.email) {
    errors.email = 'Обязательное поле'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Неправильный формат email'
  }

  if (!values.username) {
    errors.username = 'Обязательное поле'
  } else if (values.username.length < 3) {
    errors.username = 'Псевдоним должен содержать минимум 3 символа'
  }

  if (!values.firstName) {
    errors.firstName = 'Обязательное поле'
  }

  if (!values.lastName) {
    errors.lastName = 'Обязательное поле'
  }

  if (!values.password) {
    errors.password = 'Обязательное поле'
  } else if (values.password.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Обязательное поле'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают'
  }

  return errors
}
