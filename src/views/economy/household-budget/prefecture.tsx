import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardActualExpenditure from 'sections/economy/household-budget/DashboardActualExpenditure'
import DashboardActualIncome from 'sections/economy/household-budget/DashboardActualIncome'
import DashboardConsumptionExpenditure from 'sections/economy/household-budget/DashboardConsumptionExpenditure'
import LineChartAverageAnnualIncome from 'sections/economy/household-budget/LineChartAverageAnnualIncome'
import LineChartGiniCoefficientOfAnnualIncome from 'sections/economy/household-budget/LineChartGiniCoefficientOfAnnualIncome'
import TableActualExpenditure from 'sections/economy/household-budget/TableActualExpenditure'
import TableConsumptionExpenditure from 'sections/economy/household-budget/TableConsumptionExpenditure'
import TableIncome from 'sections/economy/household-budget/TableIncome'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureView({ routerProps }: Props) {
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
              <DashboardActualIncome
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardConsumptionExpenditure
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardActualExpenditure
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <LineChartAverageAnnualIncome
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <LineChartGiniCoefficientOfAnnualIncome
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableIncome
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableConsumptionExpenditure
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableActualExpenditure
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
