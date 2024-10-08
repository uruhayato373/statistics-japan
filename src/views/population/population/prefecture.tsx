import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisThreeAge from 'sections/population/population/chart/AxisThreeAge'
import AxisTotalPopulation from 'sections/population/population/chart/AxisTotalPopulation'
import PyramidPopulation from 'sections/population/population/chart/PyramidPopulation'
import DashboardDayTimePopulation from 'sections/population/population/dashboard/DashboardDayTimePopulation'
import DashboardDayTimePopulationRatio from 'sections/population/population/dashboard/DashboardDayTimePopulationRatio'
import DashboardMedianAge from 'sections/population/population/dashboard/DashboardMedianAge'
import DashboardTotalPopulation from 'sections/population/population/dashboard/DashboardTotalPopulation'
import TablePopulation from 'sections/population/population/table/TablePopulation'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardTotalPopulation },
  { Component: DashboardDayTimePopulation },
  { Component: DashboardDayTimePopulationRatio },
  { Component: DashboardMedianAge },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Section: AxisThreeAge,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisTotalPopulation,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PyramidPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TablePopulation,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function Prefecture({ routerProps }: ViewsPropsType) {
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
