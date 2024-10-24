import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import AxisAverageAnnualIncome from 'sections/economy/household-budget/chart/AxisAverageAnnualIncome'
import AxisGiniCoefficientOfAnnualIncome from 'sections/economy/household-budget/chart/AxisGiniCoefficientOfAnnualIncome'
import DashboardActualExpenditure from 'sections/economy/household-budget/dashboard/DashboardActualExpenditure'
import DashboardActualIncome from 'sections/economy/household-budget/dashboard/DashboardActualIncome'
import DashboardConsumptionExpenditure from 'sections/economy/household-budget/dashboard/DashboardConsumptionExpenditure'
import TableActualExpenditure from 'sections/economy/household-budget/table/TableActualExpenditure'
import TableConsumptionExpenditure from 'sections/economy/household-budget/table/TableConsumptionExpenditure'
import TableIncome from 'sections/economy/household-budget/table/TableIncome'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardActualIncome },
  { Component: DashboardConsumptionExpenditure },
  { Component: DashboardActualExpenditure },
]

// chart items
const chartItems = [
  {
    Section: AxisAverageAnnualIncome,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: AxisGiniCoefficientOfAnnualIncome,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
]

// table items
const tableItems = [
  {
    Section: TableIncome,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableConsumptionExpenditure,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableActualExpenditure,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function JapanView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
