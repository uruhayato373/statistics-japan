import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsScatterChart from 'cards/CardsHighchartsScatterChart'

import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '総人口と製造品出荷額等'

// x軸 総人口
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

// y軸 製造品出荷額
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010103',
  cdCat01: 'C3401',
}

interface Props {
  routerProps: RouterProps
}

// values
async function processValues() {
  const values = await handleEstatAPI().fetchValues([
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR,
  ])
  const filteredValues = values.filter((f) => f.areaCode !== '00000')

  return formatValues(filteredValues)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      value:
        d.categoryCode === 'C3401'
          ? Math.round(Number(d.value) / 100)
          : d.value,
      unit: d.categoryCode === 'C3401' ? '億円' : d.unit,
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values, 'common')
  const document = formatDocument()

  return document
}

// server action
async function serverAction(routerProps: RouterProps, document: DocumentType) {
  const { saveCorrelationPNG } = await actionSavePrefectureRanking(
    CARD_TITLE,
    routerProps,
    document
  )

  await saveCorrelationPNG()
}

export default async function ScatterProductShipmentAmountTotalPopulation({
  routerProps,
}: Props) {
  const values = await processValues()
  const document = await processDocument(values)

  if (routerProps) {
    await serverAction(routerProps, document)
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsScatterChart title={CARD_TITLE} document={document} />
    </Suspense>
  )
}
