import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import DashboardLaborForcePopulation from 'sections/laborwage/laborforce/dashboard/DashboardLaborForcePopulation'
import DashboardNonLaborForcePopulation from 'sections/laborwage/laborforce/dashboard/DashboardNonLaborForcePopulation'
import TableLaborForcePopulation from 'sections/laborwage/laborforce/table/TableLaborForcePopulation'
import TableNonLaborForcePopulation from 'sections/laborwage/laborforce/table/TableNonLaborForcePopulation'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardLaborForcePopulation },
  { Component: DashboardNonLaborForcePopulation },
]

// table items
const tableItems = [
  {
    Section: TableLaborForcePopulation,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNonLaborForcePopulation,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function LaborforceJapan({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
