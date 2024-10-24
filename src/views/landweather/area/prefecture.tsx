import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import AxisChartTotalArea from 'sections/landweather/area/chart/AxisChartTotalArea'
import PieHabitableArea from 'sections/landweather/area/chart/PieHabitableArea'
import DashboardDenselyPopulatedArea from 'sections/landweather/area/dashboard/DashboardDenselyPopulatedArea'
import DashboardForestArea from 'sections/landweather/area/dashboard/DashboardForestArea'
import DashboardHabitableArea from 'sections/landweather/area/dashboard/DashboardHabitableArea'
import DashboardTotalArea from 'sections/landweather/area/dashboard/DashboardTotalArea'
import TableParkArea from 'sections/landweather/area/table/TableParkArea'
import TableTotalArea from 'sections/landweather/area/table/TableTotalArea'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardTotalArea },
  { Component: DashboardHabitableArea },
  { Component: DashboardForestArea },
  { Component: DashboardDenselyPopulatedArea },
]

// chart items
const chartItems = [
  {
    Section: AxisChartTotalArea,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PieHabitableArea,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableTotalArea,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableParkArea,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function TotalAreaPrefecture({
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
