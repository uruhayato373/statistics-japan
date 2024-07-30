import CardsTimeTable from 'cards/CardsTimeTable'

import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import formatTable from 'utils/table'

const categories = ['A1101', 'A110101', 'A110102', 'A1301', 'A1302', 'A1303']

const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010101',
        cdCat01: categories,
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010101',
        cdCat01: categories,
        cdArea: routerProps.prefCode,
      }
    case 'city':
      return {
        statsDataId: '0000020201',
        cdCat01: categories,
        cdArea: routerProps.cityCode,
      }
  }
}

interface Props {
  routerProps: RouterProps
}

export default async function TablePopulation({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatTable(document).reactTable()

  return <CardsTimeTable title={'総人口のデータ'} contents={contents} />
}
