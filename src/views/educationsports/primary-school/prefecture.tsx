import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardPrimarySchools from 'sections/educationsports/primary-school/dashboard/DashboardPrimarySchools'
import DashboardPrimarySchoolStudents from 'sections/educationsports/primary-school/dashboard/DashboardPrimarySchoolStudents'
import DashboardPrimarySchoolTeachers from 'sections/educationsports/primary-school/dashboard/DashboardPrimarySchoolTeachers'
import TablePrimarySchool from 'sections/educationsports/primary-school/table/TablePrimarySchool'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardPrimarySchools },
  { Component: DashboardPrimarySchoolStudents },
  { Component: DashboardPrimarySchoolTeachers },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// table items
const tableItems = [
  {
    Section: TablePrimarySchool,
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
