import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'

import DashboardEmissionsPerPersonPerDay from 'sections/energy/garbage/dashboard/DashboardEmissionsPerPersonPerDay'
import DashboardTotalAmountOfGarbageDischarged from 'sections/energy/garbage/dashboard/DashboardTotalAmountOfGarbageDischarged'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardTotalAmountOfGarbageDischarged },
  { Component: DashboardEmissionsPerPersonPerDay },
]

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
    </ViewsWrapper>
  )
}
