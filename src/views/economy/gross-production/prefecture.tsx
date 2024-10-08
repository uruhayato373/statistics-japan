import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsDashboard from 'cards/CardsDashboard'
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
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardGrossPrefecturalProduct },
  { Component: DashboardPrefecturalIncome },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

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

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* dashboard items */}
      {dashboardItems.map(({ Component }, index) => (
        <GridItem key={index} {...dashboardGridProps}>
          <Component routerProps={routerProps}>
            {(props) => <CardsDashboard {...props} />}
          </Component>
        </GridItem>
      ))}
      {/* chart items */}
      {chartItems.map(({ Section, Card, gridProps }, index) => (
        <GridItem key={`chart-${index}`} {...gridProps}>
          <Section routerProps={routerProps}>
            {(props) => <Card {...props} />}
          </Section>
        </GridItem>
      ))}
      {/* table items */}
      {tableItems.map(({ Section, Card, gridProps }, index) => (
        <GridItem key={`chart-${index}`} {...gridProps}>
          <Section routerProps={routerProps}>
            {(props) => <Card {...props} />}
          </Section>
        </GridItem>
      ))}
    </MainView>
  )
}
