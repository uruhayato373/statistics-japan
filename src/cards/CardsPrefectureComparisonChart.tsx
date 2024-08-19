import { Suspense } from 'react'

import { Stack, Box, Divider, Typography } from '@mui/material'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectPrefectures from 'components/SelectPrefectures'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/e-stat'
import { handlePrefecture } from 'utils/prefecture'

interface Props {
  title?: string
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
  title,
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
          <ChartContent
            title={title}
            document={document}
            prefectures={prefectures}
          />
        </Suspense>
      </Box>
    </MainCard>
  )
}

interface ChartContentProps {
  title?: string
  document: DocumentType | null
  prefectures: Array<{ prefCode: string; prefName: string }>
}

function ChartContent({ title, document, prefectures }: ChartContentProps) {
  const contents = document
    ? formatApexcharts(document).AxisTimeChart('area')
    : null

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <SelectPrefectures prefectures={prefectures} />
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      {contents && <ApexLineChart customOptions={contents} />}
    </>
  )
}
