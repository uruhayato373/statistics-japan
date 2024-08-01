import CardsTimeTable from 'cards/CardsTimeTable'

import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import formatTable from 'utils/table'

const categories = ['B4101', 'B4102', 'B4103', 'B4111']

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

export default async function TableTemplatures({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatTable(document).reactTable()

  contents.columns = contents.columns.map((d) => {
    return {
      ...d,
      header: d.header
        .replace('（日最高気温の月平均の最高値）', '')
        .replace('（日最低気温の月平均の最低値）', ''),
      footer: d.footer
        .replace('（日最高気温の月平均の最高値）', '')
        .replace('（日最低気温の月平均の最低値）', ''),
    }
  })

  return <CardsTimeTable title={'気温・湿度のデータ'} contents={contents} />
}
