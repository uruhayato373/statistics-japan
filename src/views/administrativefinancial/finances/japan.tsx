import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import ColumnChartTotalSettlementAmount from 'sections/administrativefinancial/finances/ColumnChartTotalSettlementAmount'
import DashboardCurrentAccountRatio from 'sections/administrativefinancial/finances/DashboardCurrentAccountRatio'
import DashboardFinancialStrengthIndex from 'sections/administrativefinancial/finances/DashboardFinancialStrengthIndex'
import DashboardFutureBurdenRatio from 'sections/administrativefinancial/finances/DashboardFutureBurdenRatio'
import DashboardRealBalanceRatio from 'sections/administrativefinancial/finances/DashboardRealBalanceRatio'
import DashboardRealDebtServiceRatio from 'sections/administrativefinancial/finances/DashboardRealDebtServiceRatio'
import DashboardStandardFinancialDemandAmount from 'sections/administrativefinancial/finances/DashboardStandardFinancialDemandAmount'
import DashboardStandardFinancialIncomeAmount from 'sections/administrativefinancial/finances/DashboardStandardFinancialIncomeAmount'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function JapanView({ routerProps }: Props) {
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
              <DashboardCurrentAccountRatio
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardFinancialStrengthIndex
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardFutureBurdenRatio
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardRealBalanceRatio
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardRealDebtServiceRatio
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardStandardFinancialDemandAmount
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardStandardFinancialIncomeAmount
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <ColumnChartTotalSettlementAmount
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
