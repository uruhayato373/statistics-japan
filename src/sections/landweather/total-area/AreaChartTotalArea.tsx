import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsEstatApexAreaChart from 'cards-estat/CardsEstatApexAreaChart'
import { handlePrefecture } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const params = (routerProps: RouterProps) => {
  return {
    statsDataId: '0000010102',
    cdCat01: ['B1101', 'B1103'],
    cdArea: routerProps.prefCode,
  }
}

const customCategories = [
  {
    categoryCode: 'B1101',
    categoryName: '総面積',
    categoryUnit: 'ha',
  },
  {
    categoryCode: 'B1103',
    categoryName: '可住地面積',
    categoryUnit: 'ha',
  },
]

const customOptions: ApexOptions = {
  yaxis: [
    {
      seriesName: 'Income',
      opposite: false,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    {
      seriesName: 'Cashflow',
      opposite: true,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  ],
}

interface Props {
  routerProps: RouterProps
}

export default async function AreaChartTotalArea({ routerProps }: Props) {
  const estatParams = params(routerProps)
  const prefecture = await handlePrefecture().findItem(routerProps.prefCode)
  const title = `${prefecture.prefName}の総面積の推移`

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsEstatApexAreaChart
        title={title}
        estatParams={estatParams}
        customCategories={customCategories}
        customOptions={customOptions}
      />
    </Suspense>
  )
}
