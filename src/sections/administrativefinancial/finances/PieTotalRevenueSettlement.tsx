import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { handlePrefecture } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '歳入決算総額の内訳'

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

const PAGE_ID = 'total-revenue-settlement'

// apexChartsのオプション
const OPTIONS: ApexOptions = {
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

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filteredValues = values.filter((d) => d.areaCode === prefCode)

  return filteredValues
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values, 'common')
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function PieTotalRevenueSettlement({
  routerProps,
  children,
}: SectionsPropsType) {
  const { prefCode, prefName } = handlePrefecture().getPrefecture(routerProps)
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const options = OPTIONS
  const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

  return <> {children({ title, document, options, linkButton })}</>
}
