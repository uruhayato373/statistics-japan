import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardRoadActualLength from 'sections/infrastructure/road/dashboard/DashboardRoadActualLength'
import TableRoadActualLength from 'sections/infrastructure/road/table/TableRoadActualLength'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [{ Component: DashboardRoadActualLength }]

// table items
const tableItems = [
  {
    Section: TableRoadActualLength,
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
