import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import AxisConstructionStarts from 'sections/construction/construction/chart/AxisConstructionStarts'
import AxisPublicWorksContract from 'sections/construction/construction/chart/AxisPublicWorksContract'
import DashboardConstructionCompanies from 'sections/construction/construction/dashboard/DashboardConstructionCompanies'
import DashboardValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/dashboard/DashboardValueOfCompletedConstructionWorkByPrimeContractors'
import DashboardValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/dashboard/DashboardValueOfCompletedConstructionWorkBySubcontractors'
import TableConstructionCompanies from 'sections/construction/construction/table/TableConstructionCompanies'
import TableConstructionStarts from 'sections/construction/construction/table/TableConstructionStarts'
import TablePublicWorksContract from 'sections/construction/construction/table/TablePublicWorksContract'
import TableValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/table/TableValueOfCompletedConstructionWorkByPrimeContractors'
import TableValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/table/TableValueOfCompletedConstructionWorkBySubcontractors'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardConstructionCompanies },
  { Component: DashboardValueOfCompletedConstructionWorkByPrimeContractors },
  { Component: DashboardValueOfCompletedConstructionWorkBySubcontractors },
]

// chart items
const chartItems = [
  {
    Section: AxisConstructionStarts,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisPublicWorksContract,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableConstructionCompanies,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableConstructionStarts,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableValueOfCompletedConstructionWorkByPrimeContractors,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableValueOfCompletedConstructionWorkBySubcontractors,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TablePublicWorksContract,
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
