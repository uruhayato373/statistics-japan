'use client'

import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import ApexPyramidChart from 'components/apexcharts/ApexPyramidChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'

import { time } from 'atoms'
import useEstatAPI from 'hooks/useEstatAPI'
import formatApexcharts from 'utils/apexcharts'
import { EstatParamsType } from 'utils/e-stat'

import { useAtom } from 'jotai'

interface Props {
  title: string
  params: EstatParamsType
}

/**
 * e-Stat APIから取得したデータをD3 Map Chartで表示するコンポーネント
 *
 * @description
 * Suspenseの影響範囲を限定するため、データ取得と描画を担う部分だけ分離している。
 */
function PyramidChartContent({ params }: { params: EstatParamsType }) {
  /**
   * 選択中の年次はJoatiを使用して管理
   */
  const [selectedTime] = useAtom(time)

  /**
   * e-Stat APIからデータを取得（selectedTimeが変更されるたびに再取得）
   */
  const { document } = useEstatAPI({
    ...params,
    cdTime: `${selectedTime.timeCode}100000`,
  })

  const contents = formatApexcharts(document).PyramidChart(
    selectedTime.timeCode
  )

  return <ApexPyramidChart contents={contents} />
}

export default function CardsApexPyramid({ title, params }: Props) {
  /**
   * e-Stat APIからtimesを取得（都道府県コードは00000）
   */
  const { document: { times } = {} } = useEstatAPI({
    ...params,
    cdArea: '00000',
  })

  return (
    <MainCard content={false} title={title}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <SelectTime times={times} />
        </Stack>
        <Stack>
          <Box sx={{ pt: 1, pr: 2 }}>
            <Suspense fallback={<CircularProgressCards />}>
              <PyramidChartContent params={params} />
            </Suspense>
          </Box>
        </Stack>
      </Box>
    </MainCard>
  )
}
