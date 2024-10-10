import MainView from 'components/views//MainView'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
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
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </MainView>
  )
}
