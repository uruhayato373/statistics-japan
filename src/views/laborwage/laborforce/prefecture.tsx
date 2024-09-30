import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardLaborForcePopulation from 'sections/laborwage/laborforce/DashboardLaborForcePopulation'
import DashboardNonLaborForcePopulation from 'sections/laborwage/laborforce/DashboardNonLaborForcePopulation'
import TableLaborForcePopulation from 'sections/laborwage/laborforce/TableLaborForcePopulation'
import TableNonLaborForcePopulation from 'sections/laborwage/laborforce/TableNonLaborForcePopulation'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function LaborforcePrefecture({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { currentPrefecture } = breadcrumbsProps

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardLaborForcePopulation prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNonLaborForcePopulation
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TableLaborForcePopulation prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TableNonLaborForcePopulation prefecture={currentPrefecture} />
            </Grid>
          </Grid>{' '}
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
