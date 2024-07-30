import Box from '@mui/material/Box'

import ApexAreaChart from 'components/apexcharts/ApexAreaChart'
import MainCard from 'components/MainCard'

import { ApexChartTimeContentsType } from 'utils/apexcharts'

interface Props {
  title: string
  contents: ApexChartTimeContentsType
}

export default async function CardsApexArea({ title, contents }: Props) {
  return (
    <MainCard content={false} title={title}>
      <Box sx={{ pt: 1, pr: 2 }}>
        <ApexAreaChart contents={contents} />
      </Box>
    </MainCard>
  )
}
