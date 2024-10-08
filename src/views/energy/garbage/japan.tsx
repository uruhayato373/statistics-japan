import CardsDashboard from 'cards/CardsDashboard'

import DashboardEmissionsPerPersonPerDay from 'sections/energy/garbage/dashboard/DashboardEmissionsPerPersonPerDay'
import DashboardTotalAmountOfGarbageDischarged from 'sections/energy/garbage/dashboard/DashboardTotalAmountOfGarbageDischarged'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardTotalAmountOfGarbageDischarged },
  { Component: DashboardEmissionsPerPersonPerDay },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

export default async function JapanView({ routerProps }: ViewsPropsType) {
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
    </MainView>
  )
}
