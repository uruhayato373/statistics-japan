import MainView from 'components/views//MainView'
import GridItem from 'components/views/GridItem'

import CardsDashboard from 'cards/CardsDashboard'

import DashboardEmissionsPerPersonPerDay from 'sections/energy/garbage/dashboard/DashboardEmissionsPerPersonPerDay'
import DashboardTotalAmountOfGarbageDischarged from 'sections/energy/garbage/dashboard/DashboardTotalAmountOfGarbageDischarged'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardTotalAmountOfGarbageDischarged },
  { Component: DashboardEmissionsPerPersonPerDay },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
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
