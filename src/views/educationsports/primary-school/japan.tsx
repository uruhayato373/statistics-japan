import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import DashboardPrimarySchools from 'sections/educationsports/primary-school/dashboard/DashboardPrimarySchools'
import DashboardPrimarySchoolStudents from 'sections/educationsports/primary-school/dashboard/DashboardPrimarySchoolStudents'
import DashboardPrimarySchoolTeachers from 'sections/educationsports/primary-school/dashboard/DashboardPrimarySchoolTeachers'
import TablePrimarySchool from 'sections/educationsports/primary-school/table/TablePrimarySchool'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardPrimarySchools },
  { Component: DashboardPrimarySchoolStudents },
  { Component: DashboardPrimarySchoolTeachers },
]

// table items
const tableItems = [
  {
    Section: TablePrimarySchool,
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
