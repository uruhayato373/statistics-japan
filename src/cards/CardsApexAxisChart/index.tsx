import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import deepMerge from 'utils/deepMerge'
import { DocumentType } from 'utils/document'

import ApexAxisChart from './ApexAxisChart'

interface Props {
  title: string
  document: DocumentType
  options?: ApexOptions
  height?: string
  actionButton?: React.ReactNode
}

export default async function CardsApexAxisChart({
  title,
  document,
  options,
  height,
  actionButton,
}: Props) {
  const formatOptions = formatApexcharts(document).AxisTimeChart()
  const customOptions = deepMerge(options, formatOptions)

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
        {actionButton && (
          <Stack direction="row" spacing={1}>
            {actionButton}
          </Stack>
        )}
      </Stack>
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Box sx={{ p: 2, ...boxStyle }}>
        <ApexAxisChart options={customOptions} />
      </Box>
    </MainCard>
  )
}
