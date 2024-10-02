import { Suspense } from 'react'

import { Stack, Box, Divider, Typography } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { Options } from 'highcharts'

import deepMerge from 'utils/deepMerge'
import { DocumentType } from 'utils/document'
import formatHighcharts from 'utils/highcharts'

import HighchartsAxisChart from './HighchartsAxisChart'

interface Props {
  title?: string
  document: DocumentType
  options?: Options
  height?: string
  actionButton?: React.ReactNode
}

export default function CardsHighchartsAxisChart({
  title,
  document,
  options,
  height,
  actionButton,
}: Props) {
  const formatOptions = formatHighcharts(document).AxisTimeChart()
  const customOptions = deepMerge(options, formatOptions)

  const defaultHeight = '300px'
  const boxStyle = {
    height: height || defaultHeight,
    overflow: 'hidden',
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
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
          <HighchartsAxisChart options={customOptions} />
        </Box>
      </MainCard>
    </Suspense>
  )
}
