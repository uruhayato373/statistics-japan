'use client'

import { Suspense, useMemo } from 'react'

import dynamic from 'next/dynamic'

import { Box, Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'

import { ApexOptions } from 'apexcharts'

import { useTimeFilteredDocument } from 'hooks/useTimeFilteredDocument'
import { CardsPropsType } from 'types/cards'
import formatApexcharts from 'utils/apexcharts'

import Control from './Control'
import Header from './Header'

// ApexPieChartをSSRを無効にして動的にインポート
const ApexPieChart = dynamic(() => import('./Chart'), {
  loading: () => <CircularProgressCards />,
  ssr: false,
})

const DEFAULT_HEIGHT = '265px'

interface ContentProps {
  options: ApexOptions
  height: string
}

const Content = ({ options, height }: ContentProps) => (
  <Box sx={{ p: 2, height, overflow: 'hidden' }}>
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

  const customOptions = useMemo(() => {
    const formatOptions = formatApexcharts(filteredDocument).PieChart()
    return { ...options, ...formatOptions }
  }, [filteredDocument, options])

  return (
    <MainCard content={false}>
      <Header title={title} linkButton={linkButton} />
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Control SelectTimeComponent={SelectTimeComponent} />
      <Suspense fallback={<CircularProgressCards />}>
        <Content options={customOptions} height={height} />
      </Suspense>
    </MainCard>
  )
}
