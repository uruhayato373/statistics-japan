import Box from '@mui/material/Box'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import { ApexChartTimeContentsType } from 'utils/apexcharts'

interface Props {
  title: string
  contents: ApexChartTimeContentsType
  customOptions?: ApexOptions
}

export default async function CardsApexLine({
  title,
  contents,
  customOptions,
}: Props) {
  return (
    <MainCard content={false} title={title}>
      <Box sx={{ pt: 1, pr: 2 }}>
        <ApexLineChart contents={contents} customOptions={customOptions} />
      </Box>
    </MainCard>
  )
}
