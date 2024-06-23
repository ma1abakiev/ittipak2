import { AppBar, Box, Toolbar, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { pathKeys } from '~shared/lib/react-router'

export function GuestBar() {
  const navigate = useNavigate()
  return (
    <AppBar position="sticky" color="inherit" className="bg-uygur ">
      <div className="container">
        <Toolbar disableGutters className="flex justify-between">
          <Box className="flex items-center">
            <Link to={pathKeys.home()} className="text-white text-2xl">
              Doppa
            </Link>
          </Box>
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
