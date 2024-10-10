'use client'

import { Suspense } from 'react'

import { Box, Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'

import { ApexOptions } from 'apexcharts'

import { useTimeFilteredDocument } from 'hooks/useTimeFilteredDocument'
import { CardsPropsType } from 'types/cards'
import formatApexcharts from 'utils/apexcharts'

import ApexPieChart from './Chart'
import Control from './Control'
import Header from './Header'

const DEFAULT_HEIGHT = '200px'

const Content = ({ options, height }) => (
  <Box sx={{ p: 2, height: height || DEFAULT_HEIGHT, overflow: 'hidden' }}>
    <ApexPieChart options={options} />
  </Box>
)

export default function CardsApexPieChart({
  title,
  document,
  options,
  height = DEFAULT_HEIGHT,
  linkButton,
}: CardsPropsType<ApexOptions>) {
  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  const filteredDocument = useTimeFilteredDocument(document, selectedTimeCode)

  const formatOptions = formatApexcharts(filteredDocument).PieChart()
  const customOptions = { ...options, ...formatOptions }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard content={false}>
        <Header title={title} linkButton={linkButton} />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Control SelectTimeComponent={SelectTimeComponent} />
        <Content options={customOptions} height={height} />
      </MainCard>
    </Suspense>
  )
}
