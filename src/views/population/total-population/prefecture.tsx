import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import ColumnChartThreeAge from 'sections/population/total-population/ColumnChartThreeAge'
import DashboardDayTimePopulation from 'sections/population/total-population/DashboardDayTimePopulation'
import DashboardDayTimePopulationRatio from 'sections/population/total-population/DashboardDayTimePopulationRatio'
import DashboardMedianAge from 'sections/population/total-population/DashboardMedianAge'
import DashboardTotalPopulation from 'sections/population/total-population/DashboardTotalPopulation'
import LineChartTotalPopulation from 'sections/population/total-population/LineChartTotalPopulation'
import PyramidChartPopulation from 'sections/population/total-population/PyramidChartPopulation'
import TablePopulation from 'sections/population/total-population/TablePopulation'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function Prefecture({ routerProps }: Props) {
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
              <DashboardTotalPopulation prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardDayTimePopulation prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardDayTimePopulationRatio prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardMedianAge prefecture={currentPrefecture} />
            </Grid>
            {/* row 2 */}
            <Grid item xs={12} sm={6} md={4} lg={8}>
              <LineChartTotalPopulation prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <ColumnChartThreeAge prefecture={currentPrefecture} />
            </Grid>
            {/* row 3 */}
            <Grid item xs={12} md={5} lg={5}>
              <PyramidChartPopulation prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <TablePopulation prefecture={currentPrefecture} />
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
