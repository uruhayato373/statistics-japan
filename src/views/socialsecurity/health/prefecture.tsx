import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import AxisNumberOfDeaths from 'sections/socialsecurity/health/chart/AxisNumberOfDeaths'
import AxisNumberOfDeathsDueToLifestyleRelatedDiseases from 'sections/socialsecurity/health/chart/AxisNumberOfDeathsDueToLifestyleRelatedDiseases'
import AxisNumberOfDeathsDueToMalignantTumors from 'sections/socialsecurity/health/chart/AxisNumberOfDeathsDueToMalignantTumors'
import DashboardFoodSelfSufficiencyRate from 'sections/socialsecurity/health/dashboard/DashboardFoodSelfSufficiencyRate'
import TableHealthyLifeExpectancy from 'sections/socialsecurity/health/table/TableHealthyLifeExpectancy'
import TableNumberOfPeopleUndergoingCancerScreening from 'sections/socialsecurity/health/table/TableNumberOfPeopleUndergoingCancerScreening'
import TableNumberOfPeopleUndergoingHealthCheckups from 'sections/socialsecurity/health/table/TableNumberOfPeopleUndergoingHealthCheckups'
import TablePregnancy from 'sections/socialsecurity/health/table/TablePregnancy'
import TableTestInspection from 'sections/socialsecurity/health/table/TableTestInspection'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [{ Component: DashboardFoodSelfSufficiencyRate }]

// chart items
const chartItems = [
  {
    Section: AxisNumberOfDeaths,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisNumberOfDeathsDueToLifestyleRelatedDiseases,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisNumberOfDeathsDueToMalignantTumors,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableHealthyLifeExpectancy,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPeopleUndergoingCancerScreening,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPeopleUndergoingHealthCheckups,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TablePregnancy,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableTestInspection,
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
