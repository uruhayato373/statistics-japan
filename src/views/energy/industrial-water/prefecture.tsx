import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardIndustrialWaterVolume from 'sections/energy/industrial-water/dashboard/DashboardIndustrialWaterVolume'
import TableIndustrialWaterVolume from 'sections/energy/industrial-water/table/TableIndustrialWaterVolume'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [{ Component: DashboardIndustrialWaterVolume }]

// table items
const tableItems = [
  {
    Section: TableIndustrialWaterVolume,
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
