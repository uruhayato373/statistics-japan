import { CardsHighchartsScatterChartProps } from 'cards/CardsHighchartsScatterChart'

import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造業従業者数と製造品出荷額等'

// x軸 製造業従業者数
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010103',
  cdCat01: 'C3404',
}

// y軸 製造品出荷額
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010103',
  cdCat01: 'C3401',
}

interface Props {
  routerProps: RouterProps
  children: (props: CardsHighchartsScatterChartProps) => React.ReactNode
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
  const { formatLatestDocument } = handleDocument(values, 'common')
  const document = formatLatestDocument()

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

export default async function ScatterProductShipmentAmountManufacturingEmployees({
  routerProps,
  children,
}: Props) {
  const title = CARD_TITLE
  const values = await processValues()
  const document = await processDocument(values)

  if (routerProps) {
    await serverAction(routerProps, document)
  }

  return <> {children({ title, document })}</>
}
