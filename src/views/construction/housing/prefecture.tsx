import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
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

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
