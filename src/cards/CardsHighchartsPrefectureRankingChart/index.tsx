'use client'

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import LinkToPrefecture from 'components/button/LinkToPrefecture'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

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
}

export default function CardsHighchartsRankingChart({
  title,
  document,
  height,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chartType, SelectChartTypeComponent] = SelectChartType()

  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  useEffect(() => {
    if (selectedTimeCode) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [selectedTimeCode])

  const filteredDocument = {
    ...document,
    values: document.values.filter((f) => f.timeCode === selectedTimeCode),
  }

  const boxStyle = height ? { height } : {}

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
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
              <PrefectureRankingMapChart document={filteredDocument} />
            ) : (
              <PrefectureRankingBarChart document={filteredDocument} />
            )}
            <SourceCODH />
          </>
        )}
      </Box>
    </MainCard>
  )
}
