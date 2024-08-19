import { Suspense } from 'react'

import Box from '@mui/material/Box'

import ApexAreaChart from 'components/apexcharts/ApexAreaChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import handleEstatAPI from 'utils/e-stat'
import { handlePrefecture } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const params = (routerProps: RouterProps) => {
  return {
    statsDataId: '0000010102',
    cdCat01: ['B1101', 'B1103'],
    cdArea: routerProps.prefCode,
  }
}

// const customCategories = [
//   {
//     categoryCode: 'B1101',
//     categoryName: '総面積',
//     categoryUnit: 'ha',
//   },
//   {
//     categoryCode: 'B1103',
//     categoryName: '可住地面積',
//     categoryUnit: 'ha',
//   },
// ]

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

  const document = await handleEstatAPI(estatParams).fetchDocument()

  // カスタムカテゴリーがある場合はdocumentを上書きする
  // const customDocument = customCategories
  //   ? { ...document, categories: customCategories }
  //   : document

  const formatOptions = formatApexcharts(document).AxisTimeChart()

  const options: ApexOptions = {
    ...formatOptions,
    ...customOptions,
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard content={false} title={title}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <ApexAreaChart propOptions={options} />
        </Box>
      </MainCard>
    </Suspense>
  )
}
