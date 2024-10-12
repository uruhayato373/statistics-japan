import SectionsWrapper from 'components/sections/SectionsWrapper'

import { Options } from 'highcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '最低気温'
const CARD_ID = 'ranking-lowest-temperature'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B4103',
}

const PAGE_ID = 'lowest-temperature'

const OPTIONS: Options = {
  colorAxis: {
    stops: [
      [0, '#0000FF'], // 青（最低値）
      [0.2, '#4169E1'], // ロイヤルブルー
      [0.4, '#6495ED'], // コーンフラワーブルー
      [0.6, '#87CEEB'], // スカイブルー
      [0.8, '#FFEFD5'], // パパイヤホイップ
      [1, '#FFFFC0'], // 薄い黄色（最高値）
    ],
    minColor: '#0000FF',
    maxColor: '#FFFFC0',
    // startOnTick: false,
    // endOnTick: false,
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
  const { formatRankingDocument } = handleDocument(values)
  const document = formatRankingDocument()

  return document
}

// コンポーネントの描画
export default async function RankingLowestTemperature({
  routerProps,
  children,
}: SectionsPropsType<Options>) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, pageId: PAGE_ID, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
      options={OPTIONS}
    >
      {children}
    </SectionsWrapper>
  )
}
