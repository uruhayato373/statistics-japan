import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisNumberOfBirthsDeaths from 'sections/population/birthdeath/chart/AxisNumberOfBirthsDeaths'
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

// dashboard items
const dashboardItems = [
  { Component: DashboardBirth },
  { Component: DashboardNumberOfDeaths },
  { Component: DashboardTotalFertilityRate },
]

// chart items
const chartItems = [
  {
    Section: AxisNumberOfBirthsDeaths,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 5, md: 5, lg: 5 },
  },
  {
    Section: PieNumberOfBirthsByMothersAge,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 3, md: 3, lg: 3 },
  },
  {
    Section: PyramidNumberOfDeaths,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 4, md: 4, lg: 4 },
  },
  {
    Section: AxisNumberOfStillbirths,
    Card: CardsApexAxisChart,
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

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
