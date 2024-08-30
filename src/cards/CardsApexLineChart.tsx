import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
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

export default async function CardsApexLineChart({
  title,
  document,
  options,
  height,
}: Props) {
  const formatOptions = formatApexcharts(document).AxisTimeChart()

  const customOptions = { ...formatOptions, ...options }

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
        <ApexLineChart options={customOptions} />
      </Box>
    </MainCard>
  )
}
