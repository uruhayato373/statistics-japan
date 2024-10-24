import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'

import DashboardUrbanPlanningArea from 'sections/infrastructure/urban-planning/dashboard/DashboardUrbanPlanningArea'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [{ Component: DashboardUrbanPlanningArea }]

export default async function JapanView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
    </ViewsWrapper>
  )
}
