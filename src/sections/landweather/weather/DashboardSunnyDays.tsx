import CardsDashboardSingle from 'cards/CardsDashboard'

import formatDashboard from 'utils/dashboard'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010102',
        cdCat01: 'B4104',
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010102',
        cdCat01: 'B4104',
        cdArea: routerProps.prefCode,
      }
    case 'city':
      return {
        statsDataId: '0000020202',
        cdCat01: 'B4104',
        cdArea: routerProps.cityCode,
      }
  }
}

interface Props {
  routerProps: RouterProps
}

export default async function DashboardSunnyDays({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatDashboard(document).single()

  return <CardsDashboardSingle title={'快晴日数'} contents={contents} />
}
