import SectionsWrapper from 'components/sections/SectionsWrapper'

import { Options } from 'highcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '最高気温'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B4102',
}

const PAGE_ID = 'maximum-temperature'

const OPTIONS: Options = {
  colorAxis: {
    stops: [
      [0, '#FFFFC0'], // 薄い黄色（低温）
      [0.2, '#FFEDA0'], // やや濃い黄色
      [0.4, '#FED976'], // 薄いオレンジ
      [0.6, '#FEB24C'], // オレンジ
      [0.8, '#FD8D3C'], // 濃いオレンジ
      [0.9, '#FC4E2A'], // 明るい赤
      [1, '#E31A1C'], // 赤（高温）
    ],
    minColor: '#FFFFC0',
    maxColor: '#E31A1C',
    startOnTick: false,
    endOnTick: false,
  },
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filterdValues = values.filter((f) => f.areaCode !== '00000')

  return filterdValues
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatRankingDocument } = handleDocument(values)
  const document = formatRankingDocument()

  return document
}

// コンポーネントの描画
export default async function RankingMaximumTemperature({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, pageId: PAGE_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
      options={OPTIONS}
    >
      {children}
    </SectionsWrapper>
  )
}
