import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardCityGasSalesVolume from 'sections/energy/electric-gas/dashboard/DashboardCityGasSalesVolume'
import DashboardElectricityConsumptionForElectricLights from 'sections/energy/electric-gas/dashboard/DashboardElectricityConsumptionForElectricLights'
import DashboardElectricityDemand from 'sections/energy/electric-gas/dashboard/DashboardElectricityDemand'
import DashboardGasolineSalesVolume from 'sections/energy/electric-gas/dashboard/DashboardGasolineSalesVolume'
import DashboardGeneratedPowerAmount from 'sections/energy/electric-gas/dashboard/DashboardGeneratedPowerAmount'
import TableCityGas from 'sections/energy/electric-gas/table/TableCityGas'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardCityGasSalesVolume },
  { Component: DashboardElectricityDemand },
  { Component: DashboardGasolineSalesVolume },
  { Component: DashboardGeneratedPowerAmount },
  { Component: DashboardElectricityConsumptionForElectricLights },
]

// table items
const tableItems = [
  {
    Section: TableCityGas,
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
