import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'

import AxisFutureBurdenRatio from 'sections/administrativefinancial/chart/AxisFutureBurdenRatio'
import AxisRealDebtServiceRatio from 'sections/administrativefinancial/chart/AxisRealDebtServiceRatio'
import AxisTotalSettlementAmount from 'sections/administrativefinancial/chart/AxisTotalSettlementAmount'
import PieTotalRevenueSettlement from 'sections/administrativefinancial/chart/PieTotalRevenueSettlement'
import DashboardCurrentAccountRatio from 'sections/administrativefinancial/finances/dashboard/DashboardCurrentAccountRatio'
import DashboardFinancialStrengthIndex from 'sections/administrativefinancial/finances/dashboard/DashboardFinancialStrengthIndex'
import DashboardFutureBurdenRatio from 'sections/administrativefinancial/finances/dashboard/DashboardFutureBurdenRatio'
import DashboardRealBalanceRatio from 'sections/administrativefinancial/finances/dashboard/DashboardRealBalanceRatio'
import DashboardRealDebtServiceRatio from 'sections/administrativefinancial/finances/dashboard/DashboardRealDebtServiceRatio'
import DashboardStandardFinancialDemandAmount from 'sections/administrativefinancial/finances/dashboard/DashboardStandardFinancialDemandAmount'
import DashboardStandardFinancialIncomeAmount from 'sections/administrativefinancial/finances/dashboard/DashboardStandardFinancialIncomeAmount'
import { ViewsPropsType } from 'types/views'

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

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
    </ViewsWrapper>
  )
}
