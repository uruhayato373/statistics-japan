import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'
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

// dashboard items
const dashboardItems = [
  { Component: DashboardTotalPopulation },
  { Component: DashboardDayTimePopulation },
  { Component: DashboardDayTimePopulationRatio },
  { Component: DashboardMedianAge },
]

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

export default async function TotalPopulationJapan({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
