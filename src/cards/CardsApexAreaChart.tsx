import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexAreaChart from 'components/apexcharts/ApexAreaChart'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

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
  height,
}: Props) {
  const { series } = formatApexcharts(document).AxisTimeChart()

  const customOptions = {
    ...options,
    series: series.map((d, i) => ({ ...d, ...options[i] })),
  }

  const boxStyle = height ? { height } : {}

  return (
    <MainCard content={false}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 0 }}
      >
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Box sx={{ p: 2, ...boxStyle }}>
        <ApexAreaChart options={customOptions} />
      </Box>
    </MainCard>
  )
}
