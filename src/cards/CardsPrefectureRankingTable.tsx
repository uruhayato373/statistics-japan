import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'
import PrefectureRankingTable from 'components/table/PrefectureRankingTable'

import { DocumentType, TimeType } from 'utils/e-stat'
import formatTable from 'utils/table'

interface Props {
  document: DocumentType
  times: TimeType[]
}

/**
 * 都道府県ランキングのTableを表示するコンポーネント
 *
 */
export default function CardsPrefectureRankingTable({
  document,
  times,
}: Props) {
  const contents = formatTable(document).reactRankTable()
  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box
        sx={{
          p: 2,
          pb: 0,
          height: '600px',
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
          <SelectTime times={times} />
        </Stack>
        <Divider sx={{ mb: 1.5 }} />
        <Suspense fallback={<CircularProgressCards />}>
          <PrefectureRankingTable contents={contents} />
        </Suspense>
      </Box>
    </MainCard>
  )
}
