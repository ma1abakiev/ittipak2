import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Container,
  Typography,
  Tooltip,
  Avatar,
  Button,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import EditIcon from '@mui/icons-material/Edit'
import { removeCookie } from 'typescript-cookie'
import { pathKeys } from '~shared/lib/react-router'
import { userQueries } from '~entities/user'
import WidgetsIcon from '@mui/icons-material/Widgets'

const pages = {
  feed: 'Лента',
  favorites: 'Избранные',
}

export function TopBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { data: userData } = userQueries.useLoginUserQuery()
  const {
    data: { firstName = '', lastName = '', isStaff = '', photo = '' } = {},
  } = userData || {}

  const navigate = useNavigate()

  const handleNavigateToPage = (pageName: string) => {
    const path = `/${pageName.toLowerCase()}`
    navigate(path)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
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
    window.location.reload() // Обновить страницу
  }

  return (
    <AppBar position="sticky" className="bg-uygur">
      <Container maxWidth="lg">
        <Toolbar disableGutters className="flex justify-between">
          <Link to={pathKeys.home()} className="text-white text-2xl">
            Ittipak
          </Link>

          <div className="flex md:hidden">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="block md:hidden"
            >
              {Object.keys(pages).map((pageKey) => (
                <MenuItem
                  key={pageKey}
                  onClick={() => {
                    handleNavigateToPage(pageKey)
                    handleCloseNavMenu()
                  }}
                >
                  <Typography textAlign="center">{pages[pageKey]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>

          <div className="flex md:hidden">
            <WidgetsIcon />
            <Link to={pathKeys.home()} className="font-bold text-xl">
              Makala Box
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="hidden md:flex items-center ml-3">
              <Link to={pathKeys.favorites()}>
                <IconButton aria-label="navigate to favorites article page">
                  <BookmarkAddedIcon className="hover:text-second-100 text-white" />
                </IconButton>
              </Link>
              <Link to={pathKeys.feed()}>
                <IconButton aria-label="navigate to article page">
                  <SearchIcon className="hover:text-second-100 text-white" />
                </IconButton>
              </Link>
              {isStaff && (
                <Button
                  onClick={() => navigate(pathKeys.editor.root())}
                  size="small"
                  variant="outlined"
                  endIcon={<EditIcon />}
                  className="border-white text-white"
                >
                  Написать
                </Button>
              )}
            </div>
            <div>
              <Tooltip title="Открыть профиль">
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
                <MenuItem onClick={handleCloseUserMenu}>Профиль</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
