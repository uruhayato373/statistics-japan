import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'

import { ApexOptions } from 'apexcharts'

import { ApexSectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '実質公債費比率'

const PAGE_ID = 'real-debt-service-ratio'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: 'D2111',
}

const OPTIONS: ApexOptions = {
  chart: {
    height: 250,
    type: 'line',
  },
  annotations: {
    yaxis: [
      {
        y: 25.0,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: '早期健全化基準',
        },
      },
      {
        y: 35.0,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: '財政再建基準',
        },
      },
    ],
  },
  yaxis: {
    min: 0,
    max: 40,
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
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function AxisRealDebtServiceRatio({
  prefecture,
  children,
}: ApexSectionsPropsType) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const options = OPTIONS
  const actionButton = <LinkToPrefectureRank pageId={PAGE_ID} />

  return <> {children({ title, document, options, actionButton })}</>
}
