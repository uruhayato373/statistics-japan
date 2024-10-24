import ViewsWrapper from 'components/views//ViewsWrapper'
import TableItems from 'components/views/TableItems'

import TableStandardPrice from 'sections/construction/standard-price/table/TableStandardPrice'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { ViewsPropsType } from 'types/views'

// table items
const tableItems = [
  {
    Section: TableStandardPrice,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
