import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisNumberOfTrafficAccidentCasualties from 'sections/safetyenvironment/traffic-accident/chart/AxisNumberOfTrafficAccidentCasualties'
import DashboardNumberOfTrafficAccidentCasualties from 'sections/safetyenvironment/traffic-accident/dashboard/DashboardNumberOfTrafficAccidentCasualties'
import DashboardNumberOfTrafficAccidents from 'sections/safetyenvironment/traffic-accident/dashboard/DashboardNumberOfTrafficAccidents'
import DashboardTrafficAccidentFatalities from 'sections/safetyenvironment/traffic-accident/dashboard/DashboardTrafficAccidentFatalities'
import TableAutomobileLiabilityInsurance from 'sections/safetyenvironment/traffic-accident/table/TableAutomobileLiabilityInsurance'
import TableNumberOfDrivingLicenseHolders from 'sections/safetyenvironment/traffic-accident/table/TableNumberOfDrivingLicenseHolders'
import TableNumberOfPeopleTakingCoursesForTheElderly from 'sections/safetyenvironment/traffic-accident/table/TableNumberOfPeopleTakingCoursesForTheElderly'
import TableTrafficAccident from 'sections/safetyenvironment/traffic-accident/table/TableTrafficAccident'
import TableVoluntaryCarInsurance from 'sections/safetyenvironment/traffic-accident/table/TableVoluntaryCarInsurance'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardNumberOfTrafficAccidents },
  { Component: DashboardNumberOfTrafficAccidentCasualties },
  { Component: DashboardTrafficAccidentFatalities },
]

// chart items
const chartItems = [
  {
    Section: AxisNumberOfTrafficAccidentCasualties,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableAutomobileLiabilityInsurance,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfDrivingLicenseHolders,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPeopleTakingCoursesForTheElderly,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableTrafficAccident,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableVoluntaryCarInsurance,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
