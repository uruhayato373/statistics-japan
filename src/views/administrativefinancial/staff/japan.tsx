import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardAdministrativeDepartmentEmployees from 'sections/administrativefinancial/staff/dashboard/DashboardAdministrativeDepartmentEmployees'
import TableAdministrativeDepartmentEmployees from 'sections/administrativefinancial/staff/TableAdministrativeDepartmentEmployees'
import { RouterProps } from 'utils/props'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

interface Props {
  routerProps: RouterProps
}

// dashboard items
const dashboardItems = [
  { Component: DashboardAdministrativeDepartmentEmployees },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// table items
const tableItems = [
  {
    Section: TableAdministrativeDepartmentEmployees,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function JapanView({ routerProps }: Props) {
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
