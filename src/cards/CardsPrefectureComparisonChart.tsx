import { Suspense } from 'react'

import { Stack, Box, Divider } from '@mui/material'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectPrefectures from 'components/SelectPrefectures'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/e-stat'
import { handlePrefecture } from 'utils/prefecture'

interface Props {
  document: DocumentType | null
}

/**
 * 都道府県のLineChartを表示するコンポーネント
 *
 * @remarks
 * 選択した都道府県のデータをe-Stat APIから取得し、ApexLineChartで表示する。
 * 都道府県の選択状態はJotaiを使用して管理される。
 * Suspenseの範囲を限定するため、コンテンツを別コンポーネントに切り離している。
 */
export default async function CardsPrefectureComparisonChart({
  document,
}: Props) {
  const prefectures = await handlePrefecture().fetchItems()

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
        <Suspense fallback={<CircularProgressCards />}>
          <ChartContent document={document} prefectures={prefectures} />
        </Suspense>
      </Box>
    </MainCard>
  )
}

interface ChartContentProps {
  document: DocumentType | null
  prefectures: Array<{ prefCode: string; prefName: string }>
}

function ChartContent({ document, prefectures }: ChartContentProps) {
  const contents = document
    ? formatApexcharts(document).timeChart('area')
    : null

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <SelectPrefectures prefectures={prefectures} />
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      {contents && <ApexLineChart contents={contents} />}
    </>
  )
}
