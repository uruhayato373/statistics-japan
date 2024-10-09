import MainView from 'components/views//MainView'
import GridItem from 'components/views/GridItem'

import CardsDashboard from 'cards/CardsDashboard'
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

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

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
