import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import LineChartAverageAnnualIncome from 'sections/economy/household-budget/chart/LineChartAverageAnnualIncome'
import LineChartGiniCoefficientOfAnnualIncome from 'sections/economy/household-budget/chart/LineChartGiniCoefficientOfAnnualIncome'
import DashboardActualExpenditure from 'sections/economy/household-budget/dashboard/DashboardActualExpenditure'
import DashboardActualIncome from 'sections/economy/household-budget/dashboard/DashboardActualIncome'
import DashboardConsumptionExpenditure from 'sections/economy/household-budget/dashboard/DashboardConsumptionExpenditure'
import TableActualExpenditure from 'sections/economy/household-budget/table/TableActualExpenditure'
import TableConsumptionExpenditure from 'sections/economy/household-budget/table/TableConsumptionExpenditure'
import TableIncome from 'sections/economy/household-budget/table/TableIncome'
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
              <DashboardActualIncome prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardConsumptionExpenditure prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardActualExpenditure prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartAverageAnnualIncome prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartGiniCoefficientOfAnnualIncome
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableIncome prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableConsumptionExpenditure prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableActualExpenditure prefecture={currentPrefecture} />
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
