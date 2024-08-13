import { Avatar, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { userQueries } from '~entities/user'

export function ProfilePage() {
  const { t } = useTranslation()
  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery()

  if (isLoading) {
    return <div>{t('profile.loading')}</div>
  }

  if (isError) {
    return <div>{t('profile.error')}</div>
  }

  console.log(userData)

  const { email, firstName, lastName, photo, username } = userData.data

  return (
    <div className="container mt-52">
      <Paper
        elevation={3}
        className="w-[50%] mx-auto bg-[white] border-[1px] rounded flex items-center p-10 gap-10 md-max:w-full md-max:flex md-max:flex-col lg-max:w-full"
      >
        <Avatar
          className="h-[100px] w-[100px] rounded"
          src={photo}
          alt={`${firstName}`}
        />
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold">{t('profile.nickname')}: {username}</h1>
          <h2>{t('profile.firstName')}: {firstName}</h2>
          <h2>{t('profile.lastName')}: {lastName}</h2>
          <h2 className="text-sm text-gray">{t('profile.email')}: {email}</h2>
        </div>
      </Paper>
    </div>
  )
}
