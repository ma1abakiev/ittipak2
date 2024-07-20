import { Avatar,  Paper } from '@mui/material'
import { userQueries } from '~entities/user'

export function ProfilePage() {
  const { data: userData, isLoading, isError } = userQueries.useLoginUserQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching user data.</div>
  }

  console.log(userData)

  const { email, firstName, lastName, photo, username } = userData.data

  return (
    <div className="container mt-52">
      <Paper
        elevation={3}
        className="w-[50%] mx-auto bg-[white] border-[1px]  rounded flex  items-center  p-10 gap-10 md-max:w-full md-max:flex md-max:flex-col lg-max:w-full"
        
      >
        <Avatar
          className="h-[100px] w-[100px] rounded"
          src={photo}
          alt={`${firstName}`}
        />
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold">Nickname: {username}</h1>
          <h2>Имя: {firstName}</h2>
          <h2>Фамилия: {lastName}</h2>
          <h2 className="text-sm text-gray">mail: {email}</h2>
        </div>
      </Paper>
    </div>
  )
}
