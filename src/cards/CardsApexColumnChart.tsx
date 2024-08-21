import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import ApexColumnChart from 'components/apexcharts/ApexColumnChart'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/document'

interface Props {
  title: string
  document: DocumentType
  options?: ApexOptions
  boxHeight?: string
  chartHeight?: number
}

export default async function CardsApexColumnChart({
  title,
  document,
  options,
  boxHeight = '400px',
  chartHeight,
}: Props) {
  const formatOptions = formatApexcharts(document).AxisTimeChart()
  const customOptions = { ...formatOptions, ...options }

  const { categories } = document
  const units = categories.map((d) => d.categoryUnit)

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2, pb: 0, height: boxHeight }}>
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <ApexColumnChart
          options={customOptions}
          units={units}
          {...(chartHeight !== undefined && { height: chartHeight })}
        />
      </Box>
    </MainCard>
  )
}
