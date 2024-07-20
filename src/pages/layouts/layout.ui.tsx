import { Outlet } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'
import { GuestBar } from '~widgets/guest-bar'
import { TopBar } from '~widgets/top-bar'

export const GenericLayout = () => {
  const isAuth = getCookie('access')

  return (
    <>
      <div className="flex min-h-[100vh] flex-col justify-between">
        {isAuth ? <TopBar /> : <GuestBar />}
        <div className="mb-10">
          <Outlet></Outlet>
        </div>
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
        className="w-full h-[100vh] object-cover"
        src="https://assets-global.website-files.com/5fe213ecc3c56b20a80fa544/62fef44ae4af9319bdb4481d_Muqam-by-Ghazi-Ehmed-1600x1200.jpeg"
        alt=""
      />
      <div className="absolute ">
        <Outlet />
      </div>
    </div>
  )
}
