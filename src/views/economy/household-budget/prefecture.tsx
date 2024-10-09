import MainView from 'components/views//MainView'
import GridItem from 'components/views/GridItem'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisAverageAnnualIncome from 'sections/economy/household-budget/chart/AxisAverageAnnualIncome'
import AxisGiniCoefficientOfAnnualIncome from 'sections/economy/household-budget/chart/AxisGiniCoefficientOfAnnualIncome'
import DashboardActualExpenditure from 'sections/economy/household-budget/dashboard/DashboardActualExpenditure'
import DashboardActualIncome from 'sections/economy/household-budget/dashboard/DashboardActualIncome'
import DashboardConsumptionExpenditure from 'sections/economy/household-budget/dashboard/DashboardConsumptionExpenditure'
import TableActualExpenditure from 'sections/economy/household-budget/table/TableActualExpenditure'
import TableConsumptionExpenditure from 'sections/economy/household-budget/table/TableConsumptionExpenditure'
import TableIncome from 'sections/economy/household-budget/table/TableIncome'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardActualIncome },
  { Component: DashboardConsumptionExpenditure },
  { Component: DashboardActualExpenditure },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

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
