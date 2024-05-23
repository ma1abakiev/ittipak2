import { Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Intro } from '~widgets/intro'
import { TopBar } from '~widgets/top-bar'

export const GenericLayout = () => {
  return (
    <>
      <TopBar></TopBar>
      <Intro>
        <Typography className="text-4xl text-uygur" color={'primary'}>
          Уйгурский новостной портал
        </Typography>
      </Intro>
      <div className="container mt-10">
        <Outlet></Outlet>
      </div>
    </>
  )
}

export const NakedLayout = () => {
  return <Outlet></Outlet>
}
export function IntroLayout() {
  return (
    <div className="intro relative flex justify-center">
      <img
        className="object-cover w-full h-full"
        src="https://assets-global.website-files.com/5fe213ecc3c56b20a80fa544/62fef44ae4af9319bdb4481d_Muqam-by-Ghazi-Ehmed-1600x1200.jpeg"
        alt=""
      />
      <div className="absolute ">
        <Outlet />
      </div>
    </div>
  )
}
