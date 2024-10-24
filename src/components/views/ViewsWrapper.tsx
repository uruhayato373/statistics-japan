import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import CircularProgressViews from 'components/progress/CircularProgressViews'

import ViewsHeader from './ViewsHeader'

import { RouterPropsType } from 'types/apps'

interface Props {
  routerProps: RouterPropsType
  children: React.ReactNode
}

const ViewsWrapper = ({ routerProps, children }: Props) => {
  return (
    <Suspense fallback={<CircularProgressViews />}>
      <ViewsHeader routerProps={routerProps} />
      <Box sx={{ mt: 2.5 }}>
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {children}
        </Grid>
      </Box>
    </Suspense>
  )
}

export default ViewsWrapper
