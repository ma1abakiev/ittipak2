import { AppBar, Box, Toolbar, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'

export function GuestBar() {
  const navigate = useNavigate()
  return (
    <AppBar position="fixed" className="bg-[#2d90ed']">
      <div className="container">
        <Toolbar disableGutters className="flex justify-between">
          <Box className="flex items-center">
            <Link to={pathKeys.home()} className="font-bold text-xl block ">
              <img
                src="../../../public/ittipak_page-0001.svg"
                className="min-w-16 max-w-16"
                alt=""
              />
            </Link>
          </Box>
          <div className="flex gap-5  lg-max:hidden">
            <Link to={pathKeys.favorites()}>
              <Typography
                aria-label="navigate to favorites article page"
                className="text-white"
              >
                ИЗБРАННЫЕ
              </Typography>
            </Link>
            <Link to={pathKeys.aboutUs()}>
              <Typography
                aria-label="navigate to favorites article page"
                className="text-white"
              >
                О НАС
              </Typography>
            </Link>
          </div>
          <Box className="flex items-center gap-1">
            <Button
              className="text-white border-white border-2"
              variant="outlined"
              size="small"
              onClick={() => navigate(pathKeys.editor.root())}
            >
              Авторизоваться
            </Button>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  )
}
