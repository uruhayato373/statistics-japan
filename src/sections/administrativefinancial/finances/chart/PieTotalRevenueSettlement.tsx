import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '歳入決算総額の内訳'
const CARD_ID = 'pie-total-revenue-settlement'

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
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values, 'common')
  const document = formatDocument()

  return document
}

const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

// コンポーネントの描画
export default async function PieTotalRevenueSettlement({
  routerProps,
  children,
}: SectionsPropsType<ApexOptions>) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
      options={OPTIONS}
      linkButton={linkButton}
    >
      {children}
    </SectionsWrapper>
  )
}
