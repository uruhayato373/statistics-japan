import MainView from 'components/views//MainView'
import GridItem from 'components/views/GridItem'

import CardsDashboard from 'cards/CardsDashboard'
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

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

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
