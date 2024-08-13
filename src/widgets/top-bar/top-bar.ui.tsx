import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  Tooltip,
  Avatar,
  Button,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import { removeCookie } from 'typescript-cookie'
import { pathKeys } from '~shared/lib/react-router'
import { userQueries } from '~entities/user'
import { MenuRounded } from '@mui/icons-material/'
import { useTranslation } from 'react-i18next'

export function TopBar() {
  const { t } = useTranslation()
  const { data: userData } = userQueries.useLoginUserQuery()
  const {
    data: { firstName = '', lastName = '', role = '', photo = '' } = {},
  } = userData || {}
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
    navigate(`${pathKeys.profile.root()}`)
  }

  const handleLogout = () => {
    removeCookie('access')
    removeCookie('refresh')
    navigate(`${pathKeys.home()}`)
    userQueries.userService.removeCache()
    window.location.reload()
  }

  return (
    <AppBar position="sticky" className="bg-[#2d90ed'] py-1">
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
              <Link onClick={handleClose} to={pathKeys.favorites()}>
                <MenuItem>{t('header.favorite')}</MenuItem>
              </Link>
              <Link onClick={handleClose} to={pathKeys.aboutUs()}>
                <MenuItem>{t('header.about.us')}</MenuItem>
              </Link>
            </Menu>
          </div>
          <Link to={pathKeys.home()} className="font-bold text-xl ">
            <img
              src="../../../public/ittipak_page-0001.svg"
              className="min-w-16 max-w-16"
              alt=""
            />
          </Link>
          <div className="flex gap-5 lg-max:hidden">
            <Link to={pathKeys.favorites()}>
              <Typography
                aria-label="navigate to favorites article page"
                className="text-white"
              >
                {t('header.favorite')}
              </Typography>
            </Link>
            <Link to={pathKeys.aboutUs()}>
              <Typography
                aria-label="navigate to about us page"
                className="text-white"
              >
                {t('header.about.us')}
              </Typography>
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center ml-3">
              {role === 'writer' && (
                <Button
                  onClick={() => navigate(pathKeys.editor.root())}
                  size="small"
                  variant="outlined"
                  endIcon={<EditIcon color="white" />}
                  className="border-white text-white hover:scale-105 transition-all lg-max:hidden"
                >
                  {t('header.write')}
                </Button>
              )}
            </div>
            <div>
              <Tooltip title={t('header.profile')}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={`${firstName} ${lastName}`} src={photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>{t('header.profile')}</MenuItem>
                <MenuItem onClick={handleLogout}>{t('header.logout')}</MenuItem>
                {role === 'writer' && (
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu()
                      navigate(pathKeys.editor.root())
                    }}
                  >
                    <div className="hidden lg-max:block">{t('header.write')}</div>
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
        </Toolbar>
      </div>
    </AppBar>
  )
}
