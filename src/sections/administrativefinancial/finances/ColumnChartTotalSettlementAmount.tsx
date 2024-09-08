import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexColumnChart from 'cards/CardsApexColumnChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '決算総額'
const CARD_ID = 'ColumnChartTotalSettlementAmount'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: ['D3101', 'D3103'],
}

const APEX_OPTIONS: ApexOptions = {
  chart: {
    height: 250,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'left',
    offsetX: 10,
    markers: {
      width: 8,
      height: 8,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ['transparent'],
    width: 1,
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
async function processDocument(
  cardProps: CardProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  document.categories = document.categories.map((d) => ({
    ...d,
    type: 'column',
  }))

  return document
}

// コンポーネントの描画
export default async function ColumnChartTotalSettlementAmount({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(cardProps, values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexColumnChart
        title={title}
        document={document}
        options={APEX_OPTIONS}
      />
    </Suspense>
  )
}
