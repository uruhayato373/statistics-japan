import CardsDashboardSingle from 'cards/CardsDashboard'
import formatDashboard from 'utils/dashboard'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010103',
        cdCat01: 'C3101',
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010103',
        cdCat01: 'C3101',
        cdArea: routerProps.prefCode,
      }
    case 'city':
      return {
        statsDataId: '0000020203',
        cdCat01: 'C3101',
        cdArea: routerProps.cityCode,
      }
  }
}

interface Props {
  routerProps: RouterProps
}

export default async function DashboardAgriculturalOutput({
  routerProps,
}: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()
  const contents = formatDashboard(document).single()

  return <CardsDashboardSingle title={'農業産出額'} contents={contents} />
}
