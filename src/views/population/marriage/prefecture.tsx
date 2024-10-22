import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisAverageAgeOfFirstMarriage from 'sections/population/marriage/chart/AxisAverageAgeOfFirstMarriage'
import AxisMarriagesDivorces from 'sections/population/marriage/chart/AxisMarriagesDivorces'
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

// dashboard items
const dashboardItems = [
  { Component: DashboardNumberOfMarriages },
  { Component: DashboardNumberOfDivorces },
  { Component: DashboardAverageAgeOfFirstMarriageHusband },
  { Component: DashboardAverageAgeOfFirstMarriageWife },
]

// chart items
const chartItems = [
  {
    Section: AxisUnmarriedPopulation,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: AxisMarriagesDivorces,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: AxisAverageAgeOfFirstMarriage,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: PyramidBereavementPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 3, md: 3, lg: 3 },
  },
  {
    Section: PyramidMaritalPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 3, md: 3, lg: 3 },
  },
  {
    Section: PyramidSeparatedPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 3, md: 3, lg: 3 },
  },
  {
    Section: PyramidUnmarriedPopulation,
    Card: CardsApexPyramidChart,
    gridProps: { xs: 12, sm: 3, md: 3, lg: 3 },
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

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
