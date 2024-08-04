import { Suspense } from 'react'

import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import ApexThreeAge from 'sections/population/total-population/ApexThreeAge'
import ApexTotalPopulation from 'sections/population/total-population/ApexTotalPopulation'
import DashboardDayTimePopulation from 'sections/population/total-population/DashboardDayTimePopulation'
import DashboardDayTimePopulationRatio from 'sections/population/total-population/DashboardDayTimePopulationRatio'
import DashboardMedianAge from 'sections/population/total-population/DashboardMedianAge'
import DashboardTotalPopulation from 'sections/population/total-population/DashboardTotalPopulation'
import TablePopulation from 'sections/population/total-population/TablePopulation'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function TotalPopulationCity({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {/* row 1 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardTotalPopulation routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardDayTimePopulation routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardDayTimePopulationRatio routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardMedianAge routerProps={routerProps} />
          </Grid>
          {/* row 2 */}
          <Grid item xs={12} sm={6} md={4} lg={8}>
            <ApexTotalPopulation routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <ApexThreeAge routerProps={routerProps} />
          </Grid>
          {/* row 3 */}
          <Grid item xs={12} md={5} lg={7}>
            <TablePopulation routerProps={routerProps} />
          </Grid>
        </Grid>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
