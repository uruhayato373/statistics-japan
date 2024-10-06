import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardAquacultureYield from 'sections/agriculture/fishing/dashboard/DashboardAquacultureYield'
import DashboardCatchAmount from 'sections/agriculture/fishing/dashboard/DashboardCatchAmount'
import DashboardFisheryOutputValue from 'sections/agriculture/fishing/dashboard/DashboardFisheryOutputValue'
import DashboardNumberOfFishermenEmployed from 'sections/agriculture/fishing/dashboard/DashboardNumberOfFishermenEmployed'
import TableAquacultureYield from 'sections/agriculture/fishing/table/TableAquacultureYield'
import TableCatchAmount from 'sections/agriculture/fishing/table/TableCatchAmount'
import TableFisheryOutputValue from 'sections/agriculture/fishing/table/TableFisheryOutputValue'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardFisheryOutputValue },
  { Component: DashboardCatchAmount },
  { Component: DashboardAquacultureYield },
  { Component: DashboardNumberOfFishermenEmployed },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// table items
const tableItems = [
  {
    Section: TableFisheryOutputValue,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableCatchAmount,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableAquacultureYield,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function AgricultureJapan({
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
