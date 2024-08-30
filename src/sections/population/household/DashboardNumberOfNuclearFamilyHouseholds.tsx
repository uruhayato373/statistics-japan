import CardsDashboardSingle from 'cards/CardsDashboard'

import { saveDocument } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument, { ValueType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'
import handleValues from 'utils/values'

const CARD_TITLE = '核家族世帯数'
const CARD_ID = 'DashboardNumberOfNuclearFamilyHouseholds'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A810102',
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// valuesの取得と整形
async function fetchValues(saveProps, prefCode: string) {
  let values: ValueType[]
  if (process.env.NODE_ENV === 'development') {
    values = await handleEstatAPI().fetchValues({
      ...ESTAT_PARAMS,
    })
    await saveValues(saveProps, values)
  } else {
    values = handleValues(saveProps).readValues()
  }

  return values.filter((f) => f.areaCode === prefCode)
}

// コンポーネントの描画
export default async function DashboardNumberOfNuclearFamilyHouseholds({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const values = await fetchValues(saveProps, prefCode)

  const document = handleDocument().formatDocument(values)
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return <CardsDashboardSingle title={title} document={document} />
}
