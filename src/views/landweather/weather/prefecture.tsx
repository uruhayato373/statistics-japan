import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import AxisPrecipitation from 'sections/landweather/weather/chart/AxisPrecipitation'
import AxisTemplatures from 'sections/landweather/weather/chart/AxisTemplatures'
import DashboardAverageTemperature from 'sections/landweather/weather/dashboard/DashboardAverageTemperature'
import DashboardLowestTemperature from 'sections/landweather/weather/dashboard/DashboardLowestTemperature'
import DashboardMaximumTemperature from 'sections/landweather/weather/dashboard/DashboardMaximumTemperature'
import DashboardPrecipitation from 'sections/landweather/weather/dashboard/DashboardPrecipitation'
import DashboardRainyDays from 'sections/landweather/weather/dashboard/DashboardRainyDays'
import TableDays from 'sections/landweather/weather/table/TableDays'
import TableTemplatures from 'sections/landweather/weather/table/TableTemplatures'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardRainyDays },
  { Component: DashboardPrecipitation },
  { Component: DashboardMaximumTemperature },
  { Component: DashboardLowestTemperature },
  { Component: DashboardAverageTemperature },
  { Component: DashboardMaximumTemperature },
]

// chart items
const chartItems = [
  {
    Section: AxisPrecipitation,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisTemplatures,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableTemplatures,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableDays,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function Prefecture({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
