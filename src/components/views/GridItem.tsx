import { ReactNode } from 'react'

import Grid from '@mui/material/Grid'

interface GridItemProps {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  children: ReactNode
}

const GridItem: React.FC<GridItemProps> = ({ children, ...props }) => (
  <Grid item {...props}>
    {children}
  </Grid>
)

export default GridItem
