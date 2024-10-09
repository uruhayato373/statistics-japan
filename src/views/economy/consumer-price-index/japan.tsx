import MainView from 'components/views//MainView'
import GridItem from 'components/views/GridItem'

import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardConsumerPriceIndex from 'sections/economy/consumer-price-index/dashboard/DashboardConsumerPriceIndex'
import DashboardConsumerPriceIndexChangeRate from 'sections/economy/consumer-price-index/dashboard/DashboardConsumerPriceIndexChangeRate'
import DashboardConsumerPriceRegionalDifferenceIndex from 'sections/economy/consumer-price-index/dashboard/DashboardConsumerPriceRegionalDifferenceIndex'
import DashboardNationalPriceRegionalDifferenceIndex from 'sections/economy/consumer-price-index/dashboard/DashboardNationalPriceRegionalDifferenceIndex'
import TableConsumerPriceIndex from 'sections/economy/consumer-price-index/table/TableConsumerPriceIndex'
import TableDepositBalance from 'sections/economy/consumer-price-index/table/TableDepositBalance'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardConsumerPriceIndex },
  { Component: DashboardConsumerPriceIndexChangeRate },
  { Component: DashboardConsumerPriceRegionalDifferenceIndex },
  { Component: DashboardNationalPriceRegionalDifferenceIndex },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// table items
const tableItems = [
  {
    Section: TableConsumerPriceIndex,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableDepositBalance,
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
