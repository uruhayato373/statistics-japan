import CardsDashboardSingle from 'cards/CardsDashboard'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '可住地面積'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B1103',
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function DashboardHabitableArea({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return <CardsDashboardSingle title={title} document={document} />
}
