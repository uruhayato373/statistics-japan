import Box from '@mui/material/Box'

import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'
import ApexAreaChart from 'components/apexcharts/ApexAreaChart'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/document'

interface Props {
  title: string
  document: DocumentType
  options?: ApexOptions
  height?: string
}

export default async function CardsApexAreaChart({
  title,
  document,
  options,
  height = '400px',
}: Props) {
  const { series } = formatApexcharts(document).AxisTimeChart()

  const customOptions = {
    ...options,
    series: series.map((d, i) => ({ ...d, ...options[i] })),
  }

  const { categories } = document
  const units = categories.map((d) => d.categoryUnit)

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2, pb: 0, height }}>
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <ApexAreaChart options={customOptions} units={units} height={300} />
      </Box>
    </MainCard>
  )
}
