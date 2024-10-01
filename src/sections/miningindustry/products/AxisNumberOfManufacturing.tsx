import { Suspense } from 'react'

import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造業事業所数・従業者数の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C3403', 'C3404'],
}

const PAGE_ID = 'number-of-manufacturing-establishments'

interface Props {
  prefecture: PrefectureType
}

const APEX_OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '製造業事業所数',
      opposite: false,
      show: true,
      labels: {
        show: true,
        style: {
          fontSize: '10px',
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    {
      seriesName: '製造業従業者数',
      opposite: true,
      show: true,
      labels: {
        show: true,
        style: {
          fontSize: '10px',
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  ],
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

  document.categories[0].type = 'line'
  document.categories[1].type = 'line'

  return document
}

// コンポーネントの描画
export default async function AxisNumberOfManufacturing({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const actionButton = <LinkToPrefectureRank pageId={PAGE_ID} />

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexAxisChart
        title={title}
        document={document}
        options={APEX_OPTIONS}
        actionButton={actionButton}
      />
    </Suspense>
  )
}
