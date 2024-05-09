import { ReactNode } from 'react'
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~shared/lib/react-query/index'

type QueryClientProviderProps = {
  children: ReactNode
}

export const QueryClientProvider = (props: QueryClientProviderProps) => {
  const { children } = props
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  )
}
