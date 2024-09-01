import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexLineChart from 'cards/CardsApexLineChart'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '一般世帯数の推移'
const CARD_ID = 'MixedChartGeneralHousehold'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: ['A710101', 'A710211'],
}

const APEX_OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '一般世帯数',
      opposite: false,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    {
      seriesName: '一般世帯平均人員数',
      opposite: true,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
  ],
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(saveProps: SaveProps, prefCode: string) {
  if (process.env.NODE_ENV === 'development') {
    const { fetchValues } = handleEstatAPI()
    const values = await fetchValues(ESTAT_PARAMS)
    await saveValues(saveProps, values)
  }

  const { readValues } = handleValue(saveProps)
  const values = readValues()

  return values.filter((f) => f.areaCode === prefCode)
}

// document
async function processDocument(
  saveProps: SaveProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return document
}

// コンポーネントの描画
export default async function MixedChartGeneralHousehold({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const saveProps = { ...routerProps, cardId: CARD_ID }
  const values = await processValues(saveProps, prefCode)
  const document = await processDocument(saveProps, values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexLineChart
        title={title}
        document={document}
        options={APEX_OPTIONS}
      />
    </Suspense>
  )
}
