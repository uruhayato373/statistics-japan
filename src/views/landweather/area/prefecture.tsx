import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisChartTotalArea from 'sections/landweather/area/chart/AxisChartTotalArea'
import PieHabitableArea from 'sections/landweather/area/chart/PieHabitableArea'
import DashboardDenselyPopulatedArea from 'sections/landweather/area/dashboard/DashboardDenselyPopulatedArea'
import DashboardForestArea from 'sections/landweather/area/dashboard/DashboardForestArea'
import DashboardHabitableArea from 'sections/landweather/area/dashboard/DashboardHabitableArea'
import DashboardTotalArea from 'sections/landweather/area/dashboard/DashboardTotalArea'
import TableParkArea from 'sections/landweather/area/table/TableParkArea'
import TableTotalArea from 'sections/landweather/area/table/TableTotalArea'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardTotalArea },
  { Component: DashboardHabitableArea },
  { Component: DashboardForestArea },
  { Component: DashboardDenselyPopulatedArea },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

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
