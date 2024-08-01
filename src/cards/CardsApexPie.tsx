import Box from '@mui/material/Box'

import ApexPieChart from 'components/apexcharts/ApexPieChart'
import MainCard from 'components/MainCard'

import { ApexChartPieContentsType } from 'utils/apexcharts/formatApexchartsPie'

interface Props {
  title: string
  contents: ApexChartPieContentsType
}

export default async function CardsApexPie({ title, contents }: Props) {
  return (
    <MainCard content={false} title={title}>
      <Box sx={{ pt: 1, pr: 2 }}>
        <ApexPieChart contents={contents} />
      </Box>
    </MainCard>
  )
}
