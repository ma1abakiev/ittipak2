import '~app/theme/index.css'
import '~shared/lib/i18n/i18n'
import { QueryClientProvider } from '~app/provider/query-client-provider'
import { CustomThemeProvider } from '~app/theme/custom-theme'
import { BrowserRouter } from '~app/provider/router-provider'

export const Provider = () => {
  return (
    <QueryClientProvider>
      <CustomThemeProvider>
        <BrowserRouter />
      </CustomThemeProvider>
    </QueryClientProvider>
  )
}
