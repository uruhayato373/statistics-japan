import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import ColumnChartAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/ColumnChartAgricultureEmploymentPopulation'
import DashboardAbandonedCultivatedLand from 'sections/agriculture/agriculture/DashboardAbandonedCultivatedLand'
import DashboardAgriculturalLandConversionArea from 'sections/agriculture/agriculture/DashboardAgriculturalLandConversionArea'
import DashboardAgriculturalOutput from 'sections/agriculture/agriculture/DashboardAgriculturalOutput'
import DashboardAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/DashboardAgricultureEmploymentPopulation'
import DashboardCultivatedLandArea from 'sections/agriculture/agriculture/DashboardCultivatedLandArea'
import DashboardNumberOfFarmers from 'sections/agriculture/agriculture/DashboardNumberOfFarmers'
import LineChartNumberOfFarmers from 'sections/agriculture/agriculture/LineChartNumberOfFarmers'
import PieChartNumberOfFarmers from 'sections/agriculture/agriculture/PieChartNumberOfFarmers'
import PieChartPercentageOfFullTimeFarmers from 'sections/agriculture/agriculture/PieChartPercentageOfFullTimeFarmers'
import SourceAnnotation from 'sections/agriculture/agriculture/SourceAnnotation'
import TableAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/TableAgricultureEmploymentPopulation'
import TableCultivatedLandArea from 'sections/agriculture/agriculture/TableCultivatedLandArea'
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfFarmers
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardCultivatedLandArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAgriculturalLandConversionArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAbandonedCultivatedLand
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <LineChartNumberOfFarmers
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <ColumnChartAgricultureEmploymentPopulation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <PieChartNumberOfFarmers
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <PieChartPercentageOfFullTimeFarmers
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
            <Grid item xs={12} md={6} lg={6}>
              <TableCultivatedLandArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <SourceAnnotation />
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
