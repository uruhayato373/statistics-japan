import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import DashboardAdministrativeDepartmentEmployees from 'sections/administrativefinancial/staff/dashboard/DashboardAdministrativeDepartmentEmployees'
import TableAdministrativeDepartmentEmployees from 'sections/administrativefinancial/staff/table/TableAdministrativeDepartmentEmployees'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardAdministrativeDepartmentEmployees },
]

// table items
const tableItems = [
  {
    Section: TableAdministrativeDepartmentEmployees,
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
