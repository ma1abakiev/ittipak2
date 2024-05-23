import { Paper } from '@mui/material'
import { ReactNode } from 'react'

export const Intro = ({ children }: { children: ReactNode }) => {
  return (
    <Paper elevation={10}>
      <section className="h-32 flex justify-center items-center uppercase	 ">
        {children}
      </section>
    </Paper>
  )
}
