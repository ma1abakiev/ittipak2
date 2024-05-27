import { userQueries } from '~entities/user'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'

export const EditButton = ({ id }) => {
  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery()
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !userData) {
    return <div>Error fetching user data.</div>
  }

  console.log(userData)

  const handlePath = () => {
    navigate(`/article/edit/${id}/`)
  }

  const { isStaff } = userData.data
  if (isStaff) {
    return (
      <IconButton onClick={handlePath}>
        <EditIcon />
      </IconButton>
    )
  }

  return null
}