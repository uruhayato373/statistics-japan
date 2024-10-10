import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardHighSchools from 'sections/educationsports/high-school/dashboard/DashboardHighSchools'
import DashboardHighSchoolStudents from 'sections/educationsports/high-school/dashboard/DashboardHighSchoolStudents'
import DashboardHighSchoolTeachers from 'sections/educationsports/high-school/dashboard/DashboardHighSchoolTeachers'
import TableHighSchool from 'sections/educationsports/high-school/table/TableHighSchool'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardHighSchools },
  { Component: DashboardHighSchoolStudents },
  { Component: DashboardHighSchoolTeachers },
]

// table items
const tableItems = [
  {
    Section: TableHighSchool,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
