import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造品出荷額（従業者数当たり）'

const PAGE_ID = 'product-shipment-amount-per-manufacturing-employees'

// 分子 製造品出荷額
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010103',
  cdCat01: 'C3401',
}

// 分母 製造業従業者数
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010103',
  cdCat01: 'C3404',
}

// values
async function processValues() {
  const { fetchDivisionValues } = handleEstatAPI()
  const values = await fetchDivisionValues(
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR
  )
  const filterdValues = values.filter((f) => f.areaCode !== '00000')

  return formatValues(filterdValues)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      value: Math.round(d.value * 100),
      unit: '万円/人',
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatRankingDocument } = handleDocument(values)
  const document = formatRankingDocument()

  return document
}

// コンポーネントの描画
export default async function RankingProductShipmentAmountPerManufacturingEmployees({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, pageId: PAGE_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
