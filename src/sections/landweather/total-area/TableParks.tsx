import CardsTimeTable from 'cards/CardsTimeTable'

import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import formatTable from 'utils/table'

const categories = ['B2101', 'B2103', 'B2104', 'B2105']

const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010102',
        cdCat01: categories,
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010102',
        cdCat01: categories,
        cdArea: routerProps.prefCode,
      }
  }
}

interface Props {
  routerProps: RouterProps
}

export default async function TableParks({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatTable(document).reactTable()

  return <CardsTimeTable title={'公園面積のデータ'} contents={contents} />
}
