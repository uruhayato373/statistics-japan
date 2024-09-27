import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsScatterChart from 'cards/CardsHighchartsScatterChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造業事業所数との相関関係'

// x軸 製造業事業所数
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010103',
  cdCat01: 'C3403',
}

// y軸 製造品出荷額
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010103',
  cdCat01: 'C3401',
}

// values
async function processValues() {
  const values = await handleEstatAPI().fetchValues([
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR,
  ])

  const formattedValues = formatValues(values)

  return formattedValues
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values
    .filter((f) => f.areaCode !== '00000')
    .map((d) => {
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
  const { formatDocument } = handleDocument()
  const document = formatDocument(values, 'common')

  return document
}

export default async function ScatterChartProductShipmentAmountManufacturingEstablishments() {
  const values = await processValues()
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsScatterChart title={CARD_TITLE} document={document} />
    </Suspense>
  )
}
