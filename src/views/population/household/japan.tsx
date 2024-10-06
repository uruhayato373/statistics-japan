import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import LineChartHousehold from 'sections/population/household/chart/LineChartHousehold'
import MixedChartGeneralHousehold from 'sections/population/household/chart/MixedChartGeneralHousehold'
import DashboardNumberOfGeneralHouseholds from 'sections/population/household/dashboard/DashboardNumberOfGeneralHouseholds'
import DashboardNumberOfNuclearFamilyHouseholds from 'sections/population/household/dashboard/DashboardNumberOfNuclearFamilyHouseholds'
import DashboardNumberOfSingleHouseholds from 'sections/population/household/dashboard/DashboardNumberOfSingleHouseholds'
import TableHousehold from 'sections/population/household/table/TableHousehold'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function TotalPopulationJapan({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    const currentPrefecture = {
      prefCode: '00000',
      prefName: '日本',
    }

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfGeneralHouseholds
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfNuclearFamilyHouseholds
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfSingleHouseholds
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <LineChartHousehold prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <MixedChartGeneralHousehold prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <TableHousehold prefecture={currentPrefecture} />
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
