import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisUnmarriedPopulation from 'sections/population/marriage/chart/AxisUnmarriedPopulation'
import PyramidBereavementPopulation from 'sections/population/marriage/chart/PyramidBereavementPopulation'
import PyramidMaritalPopulation from 'sections/population/marriage/chart/PyramidMaritalPopulation'
import PyramidSeparatedPopulation from 'sections/population/marriage/chart/PyramidSeparatedPopulation'
import PyramidUnmarriedPopulation from 'sections/population/marriage/chart/PyramidUnmarriedPopulation'
import DashboardAverageAgeOfFirstMarriageHusband from 'sections/population/marriage/dashboard/DashboardAverageAgeOfFirstMarriageHusband'
import DashboardAverageAgeOfFirstMarriageWife from 'sections/population/marriage/dashboard/DashboardAverageAgeOfFirstMarriageWife'
import DashboardNumberOfDivorces from 'sections/population/marriage/dashboard/DashboardNumberOfDivorces'
import DashboardNumberOfMarriages from 'sections/population/marriage/dashboard/DashboardNumberOfMarriages'
import TableMarriage from 'sections/population/marriage/table/TableMarriage'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardNumberOfMarriages },
  { Component: DashboardNumberOfDivorces },
  { Component: DashboardAverageAgeOfFirstMarriageHusband },
  { Component: DashboardAverageAgeOfFirstMarriageWife },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Section: AxisUnmarriedPopulation,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PyramidBereavementPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PyramidMaritalPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PyramidSeparatedPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PyramidUnmarriedPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableMarriage,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function JapanView({ routerProps }: ViewsPropsType) {
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
