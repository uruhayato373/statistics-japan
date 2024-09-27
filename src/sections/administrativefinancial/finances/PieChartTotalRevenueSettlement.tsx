import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '歳入決算総額の内訳'
const CARD_ID = 'PieChartTotalRevenueSettlement'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: [
    'D3101', //歳入決算総額
    'D310101', //地方税
    'D310102', //地方譲与税
    'D310103', //地方交付税
    'D310108', //国庫支出金
    'D310115', //地方債
    'D310116', //地方特例交付金
  ],
}

// apexChartsのオプション
const APEX_OPTIONS: ApexOptions = {
  chart: {
    height: 300,
  },
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8,
    },
  },
  legend: {
    show: false,
  },
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(cardProps: CardProps, prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })
  await actionSaveValues(cardProps, values)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values, 'common')

  return document
}

// コンポーネントの描画
export default async function PieChartTotalRevenueSettlement({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(values)

  return (
    <CardsApexPieChart
      title={title}
      document={document}
      options={APEX_OPTIONS}
    />
  )
}
