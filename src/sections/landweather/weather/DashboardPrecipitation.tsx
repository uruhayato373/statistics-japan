import CardsDashboardSingle from 'cards/CardsDashboard'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '降水量'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B4109',
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function DashboardPrecipitation({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return <CardsDashboardSingle title={title} document={document} />
}
