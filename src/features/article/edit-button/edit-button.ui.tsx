import { userQueries } from '~entities/user'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const EditButton = ({ id }) => {
  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !userData) {
    return <div>Error fetching user data.</div>
  }

  const handlePath = () => {
    navigate(`/article/edit/${id}/`)
  }

  const { role } = userData.data
  if (role == 'writer') {
    return (
      <Tooltip title={t('edit_btn')}>
        <IconButton onClick={handlePath}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    )
  }

  return null
}
