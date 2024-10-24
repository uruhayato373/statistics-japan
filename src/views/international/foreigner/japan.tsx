import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import AxisImmigrationControlLaw from 'sections/international/foreigner/chart/AxisImmigrationControlLaw'
import PieForeignPopulation from 'sections/international/foreigner/chart/PieForeignPopulation'
import DashboardForeignPopulation from 'sections/international/foreigner/dashboard/DashboardForeignPopulation'
import TableForeignerSuspectCase from 'sections/international/foreigner/table/TableForeignerSuspectCase'
import TableForeignPopulation from 'sections/international/foreigner/table/TableForeignPopulation'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [{ Component: DashboardForeignPopulation }]

// chart items
const chartItems = [
  {
    Section: AxisImmigrationControlLaw,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: PieForeignPopulation,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableForeignPopulation,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableForeignerSuspectCase,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function JapanView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
