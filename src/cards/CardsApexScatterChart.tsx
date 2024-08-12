/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'
import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import ApexScatterChart from 'components/apexcharts/ApexScatterChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { DocumentType } from 'utils/e-stat'

interface Props {
  /** カードのタイトル */
  title: string
  document: DocumentType
  /** 除外する地域コード
   *  @description 例えば総面積では北海道が突出しているので、除外する
   */
  excludedAreaCode?: string[]
}

export default function CardsApexScatterChart({
  title,
  document,
  excludedAreaCode,
}: Props) {
  const areas = document.areas
    .filter((f) => f.areaCode !== '00000')
    .filter((f) => !excludedAreaCode?.includes(f.areaCode))

  const categories = document.categories

  const contents = {
    categories,
    series: areas.map((d) => {
      return {
        name: d.areaName,
        type: 'scatter',
        data: [
          {
            x: document.values
              .filter((f) => f.categoryCode === categories[0].categoryCode)
              .find((f) => f.areaCode === d.areaCode).value,
            y: document.values
              .filter((f) => f.categoryCode === categories[1].categoryCode)
              .find((f) => f.areaCode === d.areaCode).value,
          },
        ],
      }
    }),
  }

  return (
    <MainCard title={title} sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: '600px' }}>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Suspense fallback={<CircularProgressCards />}>
          <ApexScatterChart contents={contents} />
        </Suspense>
      </Box>
    </MainCard>
  )
}
