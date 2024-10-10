import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

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
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
