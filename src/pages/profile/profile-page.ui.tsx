import { useTranslation } from 'react-i18next'
import { userQueries } from '~entities/user'

import { WriterArticlesList } from '~widgets/article-list'
import { ProfileCard } from '~widgets/profile-card'

export function ProfilePage() {
  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery()
  const { t } = useTranslation()

  if (isLoading) {
    return <div>{t('profile.loading')}</div>
  }

  if (isError) {
    return <div>{t('profile.error')}</div>
  }

  const { role } = userData.data

  return (
    <div className="container mt-20 flex flex-col items-center">
      <ProfileCard></ProfileCard>
      {role === 'writer' ? (
        <>
          <h2 className="my-2 font-bold text-xl">Мои статьи</h2>
          <WriterArticlesList />
        </>
      ) : null}
    </div>
  )
}
