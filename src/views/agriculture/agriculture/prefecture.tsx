import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardAgriculturalOutput from 'sections/agriculture/agriculture/DashboardAgriculturalOutput'
import DashboardAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/DashboardAgricultureEmploymentPopulation'
import TableAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/TableAgricultureEmploymentPopulation'
import TableNumberOfFarmers from 'sections/agriculture/agriculture/TableNumberOfFarmers'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function AgriculturePrefecture({ routerProps }: Props) {
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
              <DashboardAgriculturalOutput
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAgricultureEmploymentPopulation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableAgricultureEmploymentPopulation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>{' '}
            <Grid item xs={12} md={6} lg={6}>
              <TableNumberOfFarmers
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
