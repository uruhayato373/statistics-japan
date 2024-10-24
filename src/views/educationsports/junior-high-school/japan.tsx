import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import DashboardJuniorHighSchools from 'sections/educationsports/junior-high-school/dashboard/DashboardJuniorHighSchools'
import DashboardJuniorHighSchoolStudents from 'sections/educationsports/junior-high-school/dashboard/DashboardJuniorHighSchoolStudents'
import DashboardJuniorHighSchoolTeachers from 'sections/educationsports/junior-high-school/dashboard/DashboardJuniorHighSchoolTeachers'
import TableJuniorHighSchool from 'sections/educationsports/junior-high-school/table/TableJuniorHighSchool'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardJuniorHighSchools },
  { Component: DashboardJuniorHighSchoolStudents },
  { Component: DashboardJuniorHighSchoolTeachers },
]

// table items
const tableItems = [
  {
    Section: TableJuniorHighSchool,
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
