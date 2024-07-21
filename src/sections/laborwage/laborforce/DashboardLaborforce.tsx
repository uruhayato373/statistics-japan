import CardsDashboardSingle from 'cards/CardsDashboard'
import formatDashboard from 'utils/dashboard'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010106',
        cdCat01: 'F1101',
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010106',
        cdCat01: 'F1101',
        cdArea: routerProps.prefCode,
      }
    case 'city':
      return {
        statsDataId: '0000020206',
        cdCat01: 'F1101',
        cdArea: routerProps.cityCode,
      }
  }
}

interface Props {
  routerProps: RouterProps
}

export default async function DashboardLaborforce({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatDashboard(document).single()

  return <CardsDashboardSingle title={'労働力人口'} contents={contents} />
}
