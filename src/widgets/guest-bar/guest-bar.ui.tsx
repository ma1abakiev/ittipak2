import { MenuRounded } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'
import { useTranslation } from 'react-i18next'

export function GuestBar() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" className="bg-[#2d90ed] py-1">
      <div className="container">
        <Toolbar disableGutters className="flex justify-between">
          <div className="hidden lg-max:block">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuRounded />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose} component={Link} to={pathKeys.favorites()}>
                {t('header.favorite')}
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to={pathKeys.aboutUs()}>
                {t('header.about.us')}
              </MenuItem>
            </Menu>
          </div>
          <Box className="flex items-center">
            <Link to={pathKeys.home()} className="font-bold text-xl block">
              <img
                src="/ittipak_page-0001.svg" // Убедитесь, что путь к изображению верен
                className="min-w-16 max-w-16"
                alt={t('welcome')} // Используйте перевод для alt
              />
            </Link>
          </Box>
          <div className="flex gap-5 lg-max:hidden">
            <Link to={pathKeys.favorites()}>
              <Typography
                aria-label={t('header.favorite')}
                className="text-white"
              >
                {t('header.favorite')}
              </Typography>
            </Link>
            <Link to={pathKeys.aboutUs()}>
              <Typography
                aria-label={t('header.about.us')}
                className="text-white"
              >
                {t('header.about.us')}
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
              {t('register.login')} {/* Замените на правильный ключ, если необходимо */}
            </Button>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  )
}
