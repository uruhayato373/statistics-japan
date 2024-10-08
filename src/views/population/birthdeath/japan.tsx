import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisNumberOfStillbirths from 'sections/population/birthdeath/chart/AxisNumberOfStillbirths'
import PieNumberOfBirthsByMothersAge from 'sections/population/birthdeath/chart/PieNumberOfBirthsByMothersAge'
import PyramidNumberOfDeaths from 'sections/population/birthdeath/chart/PyramidNumberOfDeaths'
import DashboardBirth from 'sections/population/birthdeath/dashboard/DashboardBirth'
import DashboardNumberOfDeaths from 'sections/population/birthdeath/dashboard/DashboardNumberOfDeaths'
import DashboardTotalFertilityRate from 'sections/population/birthdeath/dashboard/DashboardTotalFertilityRate'
import TableBirth from 'sections/population/birthdeath/table/TableBirth'
import TableDeath from 'sections/population/birthdeath/table/TableDeath'
import TableMortalityRate from 'sections/population/birthdeath/table/TableMortalityRate'
import TableNumberOfNeonatalDeaths from 'sections/population/birthdeath/table/TableNumberOfNeonatalDeaths'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardBirth },
  { Component: DashboardNumberOfDeaths },
  { Component: DashboardTotalFertilityRate },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Section: AxisNumberOfStillbirths,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PieNumberOfBirthsByMothersAge,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PyramidNumberOfDeaths,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableBirth,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableDeath,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfNeonatalDeaths,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableMortalityRate,
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
