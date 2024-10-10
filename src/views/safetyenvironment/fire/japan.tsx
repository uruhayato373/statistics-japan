import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardNumberOfFireStations from 'sections/safetyenvironment/fire/dashboard/DashboardNumberOfFireStations'
import TableEmergencyDispatch from 'sections/safetyenvironment/fire/table/TableEmergencyDispatch'
import TableFireDepartment from 'sections/safetyenvironment/fire/table/TableFireDepartment'
import TableFireEngineDispatched from 'sections/safetyenvironment/fire/table/TableFireEngineDispatched'
import TableFireInsurance from 'sections/safetyenvironment/fire/table/TableFireInsurance'
import TableFireWaterSupply from 'sections/safetyenvironment/fire/table/TableFireWaterSupply'
import TableNumberOfFireCasualties from 'sections/safetyenvironment/fire/table/TableNumberOfFireCasualties'
import TableNumberOfFires from 'sections/safetyenvironment/fire/table/TableNumberOfFires'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [{ Component: DashboardNumberOfFireStations }]

// table items
const tableItems = [
  {
    Section: TableEmergencyDispatch,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableFireDepartment,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableFireEngineDispatched,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableFireInsurance,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableFireWaterSupply,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfFireCasualties,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfFires,
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
