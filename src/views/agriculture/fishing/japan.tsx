import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import DashboardAquacultureYield from 'sections/agriculture/fishing/dashboard/DashboardAquacultureYield'
import DashboardCatchAmount from 'sections/agriculture/fishing/dashboard/DashboardCatchAmount'
import DashboardFisheryOutputValue from 'sections/agriculture/fishing/dashboard/DashboardFisheryOutputValue'
import DashboardNumberOfFishermenEmployed from 'sections/agriculture/fishing/dashboard/DashboardNumberOfFishermenEmployed'
import TableAquacultureYield from 'sections/agriculture/fishing/table/TableAquacultureYield'
import TableCatchAmount from 'sections/agriculture/fishing/table/TableCatchAmount'
import TableFisheryOutputValue from 'sections/agriculture/fishing/table/TableFisheryOutputValue'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardFisheryOutputValue },
  { Component: DashboardCatchAmount },
  { Component: DashboardAquacultureYield },
  { Component: DashboardNumberOfFishermenEmployed },
]

// table items
const tableItems = [
  {
    Section: TableFisheryOutputValue,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableCatchAmount,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableAquacultureYield,
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
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
