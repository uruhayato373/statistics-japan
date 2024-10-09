import MainView from 'components/views//MainView'
import GridItem from 'components/views/GridItem'

import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardJuniorHighSchools from 'sections/educationsports/junior-high-school/dashboard/DashboardJuniorHighSchools'
import DashboardJuniorHighSchoolStudents from 'sections/educationsports/junior-high-school/dashboard/DashboardJuniorHighSchoolStudents'
import DashboardJuniorHighSchoolTeachers from 'sections/educationsports/junior-high-school/dashboard/DashboardJuniorHighSchoolTeachers'
import TableJuniorHighSchool from 'sections/educationsports/junior-high-school/table/TableJuniorHighSchool'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardJuniorHighSchools },
  { Component: DashboardJuniorHighSchoolStudents },
  { Component: DashboardJuniorHighSchoolTeachers },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// table items
const tableItems = [
  {
    Section: TableJuniorHighSchool,
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
