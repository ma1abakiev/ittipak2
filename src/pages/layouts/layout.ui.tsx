import { Outlet } from 'react-router-dom'
import { TopBar } from '~widgets/top-bar/top-bar.ui'

export const GenericLayout = () => {
  return (
    <>
      <TopBar></TopBar>
      <Outlet></Outlet>
    </>
  )
}

export const NakedLayout = () => {
  return <Outlet></Outlet>
}
