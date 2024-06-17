import { Outlet } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'
import { Footer } from '~widgets/footer'
import { GuestBar } from '~widgets/guest-bar'
import { TopBar } from '~widgets/top-bar'

export const GenericLayout = () => {
  const isAuth = getCookie('access')

  return (
    <>
      <div className="flex min-h-[100vh] flex-col justify-between">
        {isAuth ? <TopBar /> : <GuestBar />}
        <div className="container mt-10 mb-10">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
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
