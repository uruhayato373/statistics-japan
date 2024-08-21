'use client'

import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import HighchartsMapChart from 'components/highcharts/HighchartsMapChart'
import MainCard from 'components/MainCard'
import TimeSelector from 'components/TimeSelector'

import useEstatAPI from 'hooks/useEstatAPI'
import { TimeType } from 'utils/document'
import { EstatParamsType } from 'utils/e-stat'
import formatHighcharts from 'utils/highcharts'

interface Props {
  title: string
  estatParams: EstatParamsType
  times: TimeType[]
  boxHeight?: string
}

export default function CardsEstatHighchartsMapChart({
  title,
  estatParams,
  times,
  boxHeight = '600px',
}: Props) {
  const [selectedTimeCode, SelectTimeComponent] = TimeSelector({ times })

  const { document } = useEstatAPI({
    ...estatParams,
    cdTime: selectedTimeCode ? `${selectedTimeCode}100000` : '',
  })

  if (!selectedTimeCode) {
    return <CircularProgressCards />
  }

  const series = formatHighcharts(document).mapChart()

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: boxHeight }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" color="text.primary">
            {title}
          </Typography>
        </Stack>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <SelectTimeComponent />
        <Suspense fallback={<CircularProgressCards />}>
          <HighchartsMapChart series={series} />{' '}
        </Suspense>

        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="text.secondary">
            地図は『歴史的行政区域データセットβ版』（CODH作成）を利用
          </Typography>
        </Box>
      </Box>
    </MainCard>
  )
}
