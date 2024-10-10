import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisAirTransport from 'sections/tourism/railway-air/chart/AxisAirTransport'
import AxisJapanRailwayTransport from 'sections/tourism/railway-air/chart/AxisJapanRailwayTransport'
import AxisPassengerShipTransportation from 'sections/tourism/railway-air/chart/AxisPassengerShipTransportation'
import AxisPassengerTransport from 'sections/tourism/railway-air/chart/AxisPassengerTransport'
import DashboardAirTransportPersonnel from 'sections/tourism/railway-air/dashboard/DashboardAirTransportPersonnel'
import DashboardJRCargoShipmentVolume from 'sections/tourism/railway-air/dashboard/DashboardJRCargoShipmentVolume'
import DashboardJRTransportationPersonnel from 'sections/tourism/railway-air/dashboard/DashboardJRTransportationPersonnel'
import DashboardPassengerShipTransportPersonnel from 'sections/tourism/railway-air/dashboard/DashboardPassengerShipTransportPersonnel'
import DashboardPrivateRailwayTransportationPersonnel from 'sections/tourism/railway-air/dashboard/DashboardPrivateRailwayTransportationPersonnel'
import TableBusinessOperator from 'sections/tourism/railway-air/table/TableBusinessOperator'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardJRCargoShipmentVolume },
  { Component: DashboardJRTransportationPersonnel },
  { Component: DashboardPrivateRailwayTransportationPersonnel },
  { Component: DashboardAirTransportPersonnel },
  { Component: DashboardPassengerShipTransportPersonnel },
]

// chart items
const chartItems = [
  {
    Section: AxisAirTransport,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisJapanRailwayTransport,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisPassengerShipTransportation,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisPassengerTransport,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableBusinessOperator,
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
