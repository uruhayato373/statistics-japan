import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexLineChart from 'cards/CardsApexLineChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '売春事犯'

const ESTAT_PARAMS = {
  statsDataId: '0000010111',
  cdCat01: ['K4305', 'K4306'],
}

const APEX_OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '検挙件数',
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
      seriesName: '検挙人員',
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

  document.categories[0].type = 'column'
  document.categories[1].type = 'line'

  return document
}

// コンポーネントの描画
export default async function MixedChartProstitutionOffender({
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)

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
