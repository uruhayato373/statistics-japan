import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import AxisAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/chart/AxisAgricultureEmploymentPopulation'
import AxisNumberOfFarmers from 'sections/agriculture/agriculture/chart/AxisNumberOfFarmers'
import PieNumberOfFarmers from 'sections/agriculture/agriculture/chart/PieNumberOfFarmers'
import PiePercentageOfFullTimeFarmers from 'sections/agriculture/agriculture/chart/PiePercentageOfFullTimeFarmers'
import DashboardAbandonedCultivatedLand from 'sections/agriculture/agriculture/dashboard/DashboardAbandonedCultivatedLand'
import DashboardAgriculturalLandConversionArea from 'sections/agriculture/agriculture/dashboard/DashboardAgriculturalLandConversionArea'
import DashboardAgriculturalOutput from 'sections/agriculture/agriculture/dashboard/DashboardAgriculturalOutput'
import DashboardAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/dashboard/DashboardAgricultureEmploymentPopulation'
import DashboardCultivatedLandArea from 'sections/agriculture/agriculture/dashboard/DashboardCultivatedLandArea'
import DashboardNumberOfFarmers from 'sections/agriculture/agriculture/dashboard/DashboardNumberOfFarmers'
import TableAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/table/TableAgricultureEmploymentPopulation'
import TableCultivatedLandArea from 'sections/agriculture/agriculture/table/TableCultivatedLandArea'
import TableFarmersIncome from 'sections/agriculture/agriculture/table/TableFarmersIncome'
import TableNumberOfFarmers from 'sections/agriculture/agriculture/table/TableNumberOfFarmers'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardAbandonedCultivatedLand },
  { Component: DashboardAgriculturalLandConversionArea },
  { Component: DashboardAgriculturalOutput },
  { Component: DashboardAgricultureEmploymentPopulation },
  { Component: DashboardCultivatedLandArea },
  { Component: DashboardNumberOfFarmers },
]

// chart items
const chartItems = [
  {
    Section: AxisAgricultureEmploymentPopulation,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: AxisNumberOfFarmers,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: PieNumberOfFarmers,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
  {
    Section: PiePercentageOfFullTimeFarmers,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 4 },
  },
]

// table items
const tableItems = [
  {
    Section: TableAgricultureEmploymentPopulation,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableCultivatedLandArea,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableFarmersIncome,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfFarmers,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function AgricultureJapan({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
