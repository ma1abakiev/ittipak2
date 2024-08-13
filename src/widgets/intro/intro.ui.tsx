import { useTranslation } from 'react-i18next'

export const Intro = () => {
  const { t } = useTranslation()

  return (
    <>
      <section
        className="bg-[url('https://assets-global.website-files.com/5fe213ecc3c56b20a80fa544/62fef44ae4af9319bdb4481d_Muqam-by-Ghazi-Ehmed-1600x1200.jpeg')]  bg-no-repeat bg-cover 
        bg-center h-[100vh] backdrop-opacity-40	bg-blend-darken	
        bg-intro	"
      >
        <div className="container flex items-center  justify-center h-[100vh]">
          <h2 className="text-[120px]  text-white max-w-[600px]  text-center md-max:!text-[60px] lg-max:text-[80px]">
            {t('welcome')}{' '}
          </h2>
        </div>
      </section>
    </>
  )
}
