import SectionsWrapper from 'components/sections/SectionsWrapper'

import { Options } from 'highcharts'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '製造業事業所数と製造品出荷額等'
const CARD_ID = 'scatter-product-shipment-amount-manufacturing-establishments'

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

  return formatValues(values)
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
  const { formatLatestDocument } = handleDocument(values, 'common')
  const document = formatLatestDocument()

  return document
}

export default async function ScatterProductShipmentAmountManufacturingEstablishments({
  routerProps,
  children,
}: SectionsPropsType<Options>) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
