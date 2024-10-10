import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import CircularProgressViews from 'components/progress/CircularProgressViews'

import { RouterProps } from 'utils/props'

import ViewsHeader from './ViewsHeader'

interface Props {
  routerProps: RouterProps
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
