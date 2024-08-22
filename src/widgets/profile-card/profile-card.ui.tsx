import {
  Avatar,
  Button,
  LinearProgress,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'
import { userQueries, userTypes } from '~entities/user'
import { ModalPopup } from '~widgets/modal-popup'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'

import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikValues,
  useFormikContext,
} from 'formik'

export function ProfileCard() {
  const { t } = useTranslation()
  const [active, setActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [fileSelected, setFileSelected] = useState(false)

  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery()

  const { mutate: editUser, isPending } = userQueries.useEditUserProfile()

  if (isLoading) {
    return <div>{t('loading')}</div>
  }

  if (isError) {
    return <div>{t('error_fetching_data')}</div>
  }

  const { email, firstName, lastName, username, photo } = userData.data

  const initialUser: userTypes.EditUserProfile = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    photo: null,
  }

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0]
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
    if (file) {
      setFileSelected(true)
    } else {
      setFileSelected(false)
    }
  }

  return (
    <>
      <Paper
        elevation={10}
        className="md-max:w-[350px] w-[650px] bg-[white]  rounded h-[380px] shadow-md"
      >
        <div>
          <img
            src="https://cdn.prod.website-files.com/5fe213ecc3c56b20a80fa544/62fef44ae4af9319bdb4481d_Muqam-by-Ghazi-Ehmed-1600x1200.jpeg"
            alt=""
            className="w-full max-h-[140px] object-cover rounded"
          />
          <Tooltip title={t('set_profile_photo')}>
            <Button
              className="rounded-full mx-auto flex justify-center relative top-[-60px]"
              onClick={() => setActive(true)}
            >
              <Avatar
                className="h-[100px] w-[100px] rounded-full  border-4 border-[white] "
                src={preview || photo}
                alt={`${firstName} ${lastName}`}
              />
            </Button>
          </Tooltip>
        </div>
        <div className="flex flex-col items-center gap-2 relative top-[-50px]">
          <h2 className="text-xl font-bold text-primary-800">{`${firstName} ${lastName}`}</h2>
          <p>
            @{username}, {t('author')}
          </p>
          <p>{email}</p>
          <Button
            size="small"
            variant="contained"
            className="shadow-none"
            startIcon={<EditIcon />}
            onClick={() => setActive(true)}
          >
            {t('edit')}
          </Button>
        </div>
      </Paper>
      <ModalPopup active={active} setActive={setActive}>
        <Formik
          initialValues={initialUser}
          validate={validateForm}
          onSubmit={(values) => {
            const formData = new FormData()
            formData.append('email', values.email)
            formData.append('firstName', values.firstName)
            formData.append('lastName', values.lastName)
            if (selectedFile) {
              formData.append('photo', selectedFile)
            }
            editUser({ user: formData })
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <fieldset disabled={isPending}>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label={t('email')}
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
                    id="firstName"
                    name="firstName"
                    label={t('first_name')}
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
                    label={t('last_name')}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <fieldset className="my-5">
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      handleFileChange(event)
                      setFieldValue('photo', event.currentTarget.files[0])
                    }}
                  />
                  <label htmlFor="photo">
                    <Button
                      size="small"
                      variant="contained"
                      component="span"
                      className="shadow-none bg-pc-500"
                    >
                      {t('select_profile_photo')}
                    </Button>
                  </label>
                  {fileSelected && (
                    <p className="mt-2 text-xs">
                      {t('file_selected')} {selectedFile.name}
                    </p>
                  )}
                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
              </fieldset>
              {isPending ? (
                <div className="w-full mb-2 min-h-[40px]">
                  <LinearProgress />
                </div>
              ) : (
                <SubmitButton />
              )}
            </Form>
          )}
        </Formik>
      </ModalPopup>
    </>
  )
}

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext()
  const { t } = useTranslation()

  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full mb-2 bg-second-100 shadow-none"
      disabled={!isValid || isValidating}
    >
      {t('edit')}
    </Button>
  )
}

const validateForm = (values) => {
  const { t } = useTranslation()
  const errors: Partial<FormikValues> = {}

  if (!values.email) {
    errors.email = t('required_field')
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = t('invalid_email_format')
  }

  if (!values.firstName) {
    errors.firstName = t('required_field')
  }

  if (!values.lastName) {
    errors.lastName = t('required_field')
  }

  return errors
}
