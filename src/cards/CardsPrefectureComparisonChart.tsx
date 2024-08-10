import { Suspense } from 'react'

import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectPrefectures from 'components/SelectPrefectures'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/e-stat'

interface Props {
  document: DocumentType | null
}

/**
 * 都道府県のLineChartを表示するコンポーネント
 *
 * @remarks
 * 選択した都道府県のデータをe-Stat APIから取得し、ApexLineChartで表示する。
 * 都道府県の選択状態はJotaiを使用して管理される。
 * Suspenseの範囲を限定するため、LineChartを切り離している。
 */
export default function CardsPrefectureComparisonChart({ document }: Props) {
  const contents = document
    ? formatApexcharts(document).timeChart('area')
    : null

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box
        sx={{
          p: 2,
          pb: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
          <SelectPrefectures />
        </Stack>
        <Divider sx={{ mb: 1.5 }} />
        {contents && (
          <Suspense fallback={<CircularProgressCards />}>
            <ApexLineChart contents={contents} />
          </Suspense>
        )}
      </Box>
    </MainCard>
  )
}
