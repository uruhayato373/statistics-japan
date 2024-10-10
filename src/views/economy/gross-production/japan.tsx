import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisGrossPrefecturalProduct from 'sections/economy/gross-production/chart/AxisGrossPrefecturalProduct'
import AxisPrefecturalIncome from 'sections/economy/gross-production/chart/AxisPrefecturalIncome'
import PieChartPrefecturalIncome from 'sections/economy/gross-production/chart/PieChartPrefecturalIncome'
import PieGrossPrefecturalProduct from 'sections/economy/gross-production/chart/PieGrossPrefecturalProduct'
import DashboardGrossPrefecturalProduct from 'sections/economy/gross-production/dashboard/DashboardGrossPrefecturalProduct'
import DashboardPrefecturalIncome from 'sections/economy/gross-production/dashboard/DashboardPrefecturalIncome'
import TableGrossPrefecturalProduct from 'sections/economy/gross-production/table/TableGrossPrefecturalProduct'
import TablePrefecturalIncome from 'sections/economy/gross-production/table/TablePrefecturalIncome'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardGrossPrefecturalProduct },
  { Component: DashboardPrefecturalIncome },
]

// chart items
const chartItems = [
  {
    Section: AxisGrossPrefecturalProduct,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: AxisPrefecturalIncome,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: PieChartPrefecturalIncome,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: PieGrossPrefecturalProduct,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
]

// table items
const tableItems = [
  {
    Section: TableGrossPrefecturalProduct,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TablePrefecturalIncome,
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
