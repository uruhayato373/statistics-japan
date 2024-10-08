import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsDashboard from 'cards/CardsDashboard'
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
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardJRCargoShipmentVolume },
  { Component: DashboardJRTransportationPersonnel },
  { Component: DashboardPrivateRailwayTransportationPersonnel },
  { Component: DashboardAirTransportPersonnel },
  { Component: DashboardPassengerShipTransportPersonnel },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

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
