import CardsTimeTable from 'cards/CardsTimeTable'

import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import formatTable from 'utils/table'

const categories = [
  'B4104',
  'B4105',
  'B4106',
  'B4107',
  'B4108',
  'B4109',
  'B4110',
]

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

export default async function TableDays({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatTable(document).reactTable()

  return <CardsTimeTable title={'気温・湿度のデータ'} contents={contents} />
}
