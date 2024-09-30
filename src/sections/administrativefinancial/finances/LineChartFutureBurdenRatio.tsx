import { Suspense } from 'react'

import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '将来負担比率'
const CARD_ID = 'LineChartFutureBurdenRatio'
const PAGE_ID = 'future-burden-ratio'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: 'D2112',
}

const APEX_OPTIONS: ApexOptions = {
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

interface Props {
  prefecture: PrefectureType
}

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function LineChartFutureBurdenRatio({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID, PAGE_ID)
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const customActionButton = <LinkToPrefectureRank cardProps={cardProps} />

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexAxisChart
        title={title}
        document={document}
        options={APEX_OPTIONS}
        actionButton={customActionButton}
      />
    </Suspense>
  )
}
