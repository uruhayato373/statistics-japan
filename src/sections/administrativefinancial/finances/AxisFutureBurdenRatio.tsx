import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'

import { ApexOptions } from 'apexcharts'

import { ApexSectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '将来負担比率'

const PAGE_ID = 'future-burden-ratio'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: 'D2112',
}

const OPTIONS: ApexOptions = {
  chart: {
    height: 250,
    type: 'line',
  },
  annotations: {
    yaxis: [
      {
        y: 400,
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
    ],
  },
  yaxis: {
    min: 100,
    max: 450,
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
export default async function AxisFutureBurdenRatio({
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