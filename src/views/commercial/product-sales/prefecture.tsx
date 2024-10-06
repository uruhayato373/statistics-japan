import CardsDashboard from 'cards/CardsDashboard'
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
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardProductSalesAmount },
  { Component: DashboardNumberOfCommercialEstablishments },
  { Component: DashboardNumberOfCommercialEmployees },
  { Component: DashboardAmountOfProductOnHand },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

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

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
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
