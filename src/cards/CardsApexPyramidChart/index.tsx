'use client'

import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'

import { ApexOptions } from 'apexcharts'

import ApexPyramidChart from 'cards/CardsApexPyramidChart/ApexPyramidChart'

import { useTimeFilteredDocument } from 'hooks/useTimeFilteredDocument'
import { CardsPropsType } from 'types/cards'
import formatApexcharts from 'utils/apexcharts'

import Control from './Control'

const DEFAULT_HEIGHT = '250px'

interface ContentProps {
  options: ApexOptions
  height: string
}

const Content = ({ options, height }: ContentProps) => (
  <Box sx={{ p: 2, height, overflow: 'hidden' }}>
    <ApexPyramidChart options={options} />
  </Box>
)

export default function CardsApexPyramidChart({
  title,
  document,
  options,
  height = DEFAULT_HEIGHT,
}: CardsPropsType<ApexOptions>) {
  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  const filteredDocument = useTimeFilteredDocument(document, selectedTimeCode)

  const formatOptions =
    formatApexcharts(filteredDocument).PyramidChart(selectedTimeCode)
  const customOptions = { ...formatOptions, ...options }

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
      <Control SelectTimeComponent={SelectTimeComponent} />
      <Suspense fallback={<CircularProgressCards />}>
        <Content options={customOptions} height={height} />
      </Suspense>
    </MainCard>
  )
}
