import MainView from 'components/views//MainView'
import GridItem from 'components/views/GridItem'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsHighchartsAxisChart from 'cards/CardsHighchartsAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisNumberOfManufacturing from 'sections/miningindustry/products/chart/AxisNumberOfManufacturing'
import AxisProductShipmentAmount from 'sections/miningindustry/products/chart/AxisProductShipmentAmount'
import PieProductShipmentAmountByIndustrialClassification from 'sections/miningindustry/products/chart/PieProductShipmentAmountByIndustrialClassification'
import DashboardNumberOfManufacturingEmployees from 'sections/miningindustry/products/dashboard/DashboardNumberOfManufacturingEmployees'
import DashboardNumberOfManufacturingEstablishments from 'sections/miningindustry/products/dashboard/DashboardNumberOfManufacturingEstablishments'
import DashboardProductShipmentAmount from 'sections/miningindustry/products/dashboard/DashboardProductShipmentAmount'
import TableProductShipmentAmount from 'sections/miningindustry/products/table/TableProductShipmentAmount'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardProductShipmentAmount },
  { Component: DashboardNumberOfManufacturingEstablishments },
  { Component: DashboardNumberOfManufacturingEmployees },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Section: AxisProductShipmentAmount,
    Card: CardsHighchartsAxisChart,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: AxisNumberOfManufacturing,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: PieProductShipmentAmountByIndustrialClassification,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableProductShipmentAmount,
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
