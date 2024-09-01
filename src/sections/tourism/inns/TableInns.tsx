import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '旅館等営業施設数'
const CARD_ID = 'TableNumberOfOperatingFacilities'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C3801',
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// valuesの取得と整形
async function fetchValues(prefCode: string) {
  const values = await handleEstatAPI().fetchValues({
    ...ESTAT_PARAMS,
    cdArea: prefCode,
  })

  return values
}

// コンポーネントの描画
export default async function TableNumberOfOperatingFacilities({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const values = await fetchValues(prefCode)
  if (process.env.NODE_ENV === 'development') {
    await saveValues(saveProps, values)
  }

  const document = handleDocument().formatDocument(values)
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return <CardsReactTimeTable title={title} document={document} />
}
