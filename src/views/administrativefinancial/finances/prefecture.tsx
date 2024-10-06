import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsDashboard from 'cards/CardsDashboard'

import AxisFutureBurdenRatio from 'sections/administrativefinancial/finances/AxisFutureBurdenRatio'
import AxisRealDebtServiceRatio from 'sections/administrativefinancial/finances/AxisRealDebtServiceRatio'
import AxisTotalSettlementAmount from 'sections/administrativefinancial/finances/AxisTotalSettlementAmount'
import DashboardCurrentAccountRatio from 'sections/administrativefinancial/finances/dashboard/DashboardCurrentAccountRatio'
import DashboardFinancialStrengthIndex from 'sections/administrativefinancial/finances/dashboard/DashboardFinancialStrengthIndex'
import DashboardFutureBurdenRatio from 'sections/administrativefinancial/finances/dashboard/DashboardFutureBurdenRatio'
import DashboardRealBalanceRatio from 'sections/administrativefinancial/finances/dashboard/DashboardRealBalanceRatio'
import DashboardRealDebtServiceRatio from 'sections/administrativefinancial/finances/dashboard/DashboardRealDebtServiceRatio'
import DashboardStandardFinancialDemandAmount from 'sections/administrativefinancial/finances/dashboard/DashboardStandardFinancialDemandAmount'
import DashboardStandardFinancialIncomeAmount from 'sections/administrativefinancial/finances/dashboard/DashboardStandardFinancialIncomeAmount'
import PieTotalRevenueSettlement from 'sections/administrativefinancial/finances/PieTotalRevenueSettlement'
import { handlePrefecture } from 'utils/prefecture'
import { RouterProps } from 'utils/props'
import GridItem from 'views-grid/GridItem'
import ViewsHeader from 'views-grid/ViewsHeader'

interface Props {
  routerProps: RouterProps
}

// dashboard items
const dashboardItems = [
  { Component: DashboardCurrentAccountRatio },
  { Component: DashboardFinancialStrengthIndex },
  { Component: DashboardFutureBurdenRatio },
  { Component: DashboardRealBalanceRatio },
  { Component: DashboardRealDebtServiceRatio },
  { Component: DashboardStandardFinancialDemandAmount },
  { Component: DashboardStandardFinancialIncomeAmount },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Section: AxisTotalSettlementAmount,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: AxisFutureBurdenRatio,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: AxisRealDebtServiceRatio,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: PieTotalRevenueSettlement,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
]

export default async function PrefectureView({ routerProps }: Props) {
  const currentPrefecture = handlePrefecture().findItem(routerProps.prefCode)

  return (
    <Suspense fallback={<CircularProgressViews />}>
      <ViewsHeader routerProps={routerProps} />
      <Box sx={{ mt: 2.5 }}>
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {/* dashboard items */}
          {dashboardItems.map(({ Component }, index) => (
            <GridItem key={index} {...dashboardGridProps}>
              <Component prefecture={currentPrefecture}>
                {(props) => <CardsDashboard {...props} />}
              </Component>
            </GridItem>
          ))}
          {/* chart items */}
          {chartItems.map(({ Section, Card, gridProps }, index) => (
            <GridItem key={`chart-${index}`} {...gridProps}>
              <Section prefecture={currentPrefecture}>
                {(props) => <Card {...props} />}
              </Section>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Suspense>
  )
}
