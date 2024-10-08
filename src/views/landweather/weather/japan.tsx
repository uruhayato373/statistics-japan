import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisPrecipitation from 'sections/landweather/weather/chart/AxisPrecipitation'
import AxisTemplatures from 'sections/landweather/weather/chart/AxisTemplatures'
import DashboardAverageTemperature from 'sections/landweather/weather/dashboard/DashboardAverageTemperature'
import DashboardLowestTemperature from 'sections/landweather/weather/dashboard/DashboardLowestTemperature'
import DashboardMaximumTemperature from 'sections/landweather/weather/dashboard/DashboardMaximumTemperature'
import DashboardPrecipitation from 'sections/landweather/weather/dashboard/DashboardPrecipitation'
import DashboardRainyDays from 'sections/landweather/weather/dashboard/DashboardRainyDays'
import TableDays from 'sections/landweather/weather/table/TableDays'
import TableTemplatures from 'sections/landweather/weather/table/TableTemplatures'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardRainyDays },
  { Component: DashboardPrecipitation },
  { Component: DashboardMaximumTemperature },
  { Component: DashboardLowestTemperature },
  { Component: DashboardAverageTemperature },
  { Component: DashboardMaximumTemperature },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

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

export default async function Japan({ routerProps }: ViewsPropsType) {
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
