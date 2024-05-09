import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '~app/theme/index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

type CustomThemeProviderProps = {
  children: ReactNode
}

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
})

export function CustomThemeProvider(props: CustomThemeProviderProps) {
  const { children } = props

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </StyledEngineProvider>
  )
}
