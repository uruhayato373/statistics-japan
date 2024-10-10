import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardAmountOfProductOnHand from 'sections/commercial/product-sales/dashboard/DashboardAmountOfProductOnHand'
import DashboardNumberOfCommercialEmployees from 'sections/commercial/product-sales/dashboard/DashboardNumberOfCommercialEmployees'
import DashboardNumberOfCommercialEstablishments from 'sections/commercial/product-sales/dashboard/DashboardNumberOfCommercialEstablishments'
import DashboardProductSalesAmount from 'sections/commercial/product-sales/dashboard/DashboardProductSalesAmount'
import TableAmountOfProductOnHand from 'sections/commercial/product-sales/table/TableAmountOfProductOnHand'
import TableNumberOfCommercialEmployees from 'sections/commercial/product-sales/table/TableNumberOfCommercialEmployees'
import TableNumberOfCommercialEstablishments from 'sections/commercial/product-sales/table/TableNumberOfCommercialEstablishments'
import TableProductSalesAmount from 'sections/commercial/product-sales/table/TableProductSalesAmount'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardProductSalesAmount },
  { Component: DashboardNumberOfCommercialEstablishments },
  { Component: DashboardNumberOfCommercialEmployees },
  { Component: DashboardAmountOfProductOnHand },
]

// table items
const tableItems = [
  {
    Section: TableProductSalesAmount,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfCommercialEstablishments,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfCommercialEmployees,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableAmountOfProductOnHand,
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
