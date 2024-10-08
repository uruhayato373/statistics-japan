import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisNumberOfStillbirths from 'sections/population/birthdeath/chart/AxisNumberOfStillbirths'
import AxisHousehold from 'sections/population/household/chart/AxisHousehold'
import PieNumberOfSingleFatherHouseholdsByFathersAge from 'sections/population/household/chart/PieNumberOfSingleFatherHouseholdsByFathersAge'
import PieNumberOfSingleMotherHouseholdsByMothersAge from 'sections/population/household/chart/PieNumberOfSingleMotherHouseholdsByMothersAge'
import DashboardNumberOfGeneralHouseholds from 'sections/population/household/dashboard/DashboardNumberOfGeneralHouseholds'
import DashboardNumberOfNuclearFamilyHouseholds from 'sections/population/household/dashboard/DashboardNumberOfNuclearFamilyHouseholds'
import DashboardNumberOfSingleFatherHouseholds from 'sections/population/household/dashboard/DashboardNumberOfSingleFatherHouseholds'
import DashboardNumberOfSingleHouseholds from 'sections/population/household/dashboard/DashboardNumberOfSingleHouseholds'
import DashboardNumberOfSingleMotherHouseholds from 'sections/population/household/dashboard/DashboardNumberOfSingleMotherHouseholds'
import TableHousehold from 'sections/population/household/table/TableHousehold'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardNumberOfGeneralHouseholds },
  { Component: DashboardNumberOfNuclearFamilyHouseholds },
  { Component: DashboardNumberOfSingleFatherHouseholds },
  { Component: DashboardNumberOfSingleHouseholds },
  { Component: DashboardNumberOfSingleMotherHouseholds },
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
    Section: AxisHousehold,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PieNumberOfSingleFatherHouseholdsByFathersAge,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PieNumberOfSingleMotherHouseholdsByMothersAge,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableHousehold,
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
