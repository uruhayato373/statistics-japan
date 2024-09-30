'use client'

import { Suspense } from 'react'

import dynamic from 'next/dynamic'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import LinkToPrefecture from 'components/button/LinkToPrefecture'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { Options } from 'highcharts'

import { useLoadingState } from 'hooks/useLoadingState'
import { useTimeFilteredDocument } from 'hooks/useTimeFilteredDocument'
import { DocumentType } from 'utils/document'

import SelectChartType from './SelectChartType'
import SelectTime from './SelectTime'
import SourceCODH from './SourceCODH'

const PrefectureRankingMapChart = dynamic(
  () => import('./PrefectureRankingMapChart'),
  {
    loading: () => <CircularProgressCards />,
    ssr: false,
  }
)

const PrefectureRankingBarChart = dynamic(
  () => import('./PrefectureRankingBarChart'),
  {
    loading: () => <CircularProgressCards />,
    ssr: false,
  }
)

interface Props {
  title: string
  document: DocumentType
  height?: string
  options?: Options
}

// header
const Header = ({ title }: { title: string }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ p: 2, pb: 0 }}
  >
    <Typography variant="h5" color="text.primary">
      {title}
    </Typography>
    <LinkToPrefecture />
  </Stack>
)

export default function CardsHighchartsPrefectureRankingChart({
  title,
  document,
  height,
  options,
}: Props) {
  const [chartType, SelectChartTypeComponent] = SelectChartType()

  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  const isLoading = useLoadingState(selectedTimeCode)
  const filteredDocument = useTimeFilteredDocument(document, selectedTimeCode)

  const boxStyle = height ? { height } : {}

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard sx={{ mt: 1 }} content={false}>
        <Header title={title} />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2 }}
        >
          <SelectTimeComponent />
          <SelectChartTypeComponent />
        </Stack>
        <Box sx={{ p: 2, ...boxStyle }}>
          {isLoading ? (
            <CircularProgressCards />
          ) : (
            <>
              {chartType === 'map' ? (
                <PrefectureRankingMapChart
                  document={filteredDocument}
                  options={options}
                />
              ) : (
                <PrefectureRankingBarChart document={filteredDocument} />
              )}
              <SourceCODH />
            </>
          )}
        </Box>
      </MainCard>
    </Suspense>
  )
}
