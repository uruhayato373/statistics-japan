import MainView from 'components/views//MainView'
import GridItem from 'components/views/GridItem'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import BarChartNumberOfHousesByStructure from 'sections/construction/housing/chart/AxisNumberOfHousesByStructure'
import BarChartNumberOfHousesByYearOfConstruction from 'sections/construction/housing/chart/AxisNumberOfHousesByYearOfConstruction'
import PieChartNumberOfHomesOwned from 'sections/construction/housing/chart/PieNumberOfHomesOwned'
import DashboardTotalNumberOfHouses from 'sections/construction/housing/dashboard/DashboardTotalNumberOfHouses'
import TableNumberOfApartments from 'sections/construction/housing/table/TableNumberOfApartments'
import TableNumberOfNewHousingUnitsStarted from 'sections/construction/housing/table/TableNumberOfNewHousingUnitsStarted'
import TableNumberOfSingleFamilyHomes from 'sections/construction/housing/table/TableNumberOfSingleFamilyHomes'
import TableNumberOfTenementHouses from 'sections/construction/housing/table/TableNumberOfTenementHouses'
import TablePerHouse from 'sections/construction/housing/table/TablePerHouse'
import TableTotalNumberOfHouses from 'sections/construction/housing/table/TableTotalNumberOfHouses'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [{ Component: DashboardTotalNumberOfHouses }]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Section: PieChartNumberOfHomesOwned,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: BarChartNumberOfHousesByStructure,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: BarChartNumberOfHousesByYearOfConstruction,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
]

// table items
const tableItems = [
  {
    Section: TableTotalNumberOfHouses,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfSingleFamilyHomes,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfTenementHouses,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfApartments,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfNewHousingUnitsStarted,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TablePerHouse,
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
