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

const CARD_TITLE = '決算総額'
const CARD_ID = 'ColumnChartTotalSettlementAmount'
const PAGE_ID = 'total-settlement-amount'

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
  await actionSaveValues(cardProps, formatValues(values))

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      categoryName: d.categoryName.replace('（都道府県財政）', ''),
      // 単位を億円に変換
      value: Math.round(Number(d.value) / 100000),
      unit: '億円',
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
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
  const cardProps = handleProps(routerProps).cardProps(CARD_ID, PAGE_ID)
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