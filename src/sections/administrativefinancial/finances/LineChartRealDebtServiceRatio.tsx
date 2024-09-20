import { Suspense } from 'react'

import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '実質公債費比率'
const CARD_ID = 'LineChartRealDebtServiceRatio'

const PAGE_ID = 'real-debt-service-ratio'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: 'D2111',
}

const APEX_OPTIONS: ApexOptions = {
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
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function LineChartRealDebtServiceRatio({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  cardProps.pageId = PAGE_ID

  const values = await processValues(cardProps, prefCode)
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
