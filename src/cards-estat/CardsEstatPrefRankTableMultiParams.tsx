/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'
import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'
import ReactSortingTable from 'components/table/ReactSortingTable'
import SimpleBar from 'components/third-party/SimpleBar'

import { time } from 'atoms'
import useEstatAPIs from 'hooks/useEstatAPIs'
import { EstatParamsType } from 'utils/e-stat'
import formatTable from 'utils/table'

import { useAtom } from 'jotai'

interface Props {
  params: EstatParamsType[]
}

/**
 * e-Stat APIから取得したデータをTableで表示するコンポーネント
 *
 * @description
 * Suspenseの影響範囲を限定するため、データ取得と描画を担う部分だけ分離している。
 */
function TableContent({ params }: { params: EstatParamsType }) {
  // 選択中の年次はJotaiを使用して管理
  const [selectedTime] = useAtom(time)

  // e-Stat APIからデータを取得（selectedTimeが変更されるたびに再取得）
  const { document } = useEstatAPIs(
    params.map((d) => ({ ...d, cdTime: `${selectedTime.timeCode}100000` })),
    'ratio'
  )

  /**
   * Table表示用のデータを整形
   */
  const contents = formatTable(document).reactRankTable()
  const { averageString, medianString } = contents

  return (
    <>
      {' '}
      <SimpleBar
        sx={{
          flex: 1,
          mb: 2,
          minHeight: 0,
        }}
      >
        <ReactSortingTable contents={contents} />
      </SimpleBar>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ mt: 5, mb: 5 }}
      >
        <Stack
          direction="column"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="subtitle2" color="secondary">
            平均値
          </Typography>
          <Typography variant="h5">{averageString}</Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="subtitle2" color="secondary">
            中央値
          </Typography>
          <Typography variant="h5">{medianString}</Typography>
        </Stack>
      </Grid>
    </>
  )
}

/**
 * 2つのe-Stat APIからデータを取得し、都道府県ランキングのtableを表示するコンポーネント
 *
 * @description
 * useEstatAPIとuseEstatAPIsのカスタムフックを条件分岐下で使用することができないため、
 * それぞれ別のコンポーネントとして実装している。
 */
export default function CardsEstatPrefRankTableMultiParams({ params }: Props) {
  // e-Stat APIからtimesを取得（都道府県コードは00000）
  const { document: { times } = {} } = useEstatAPIs(
    params.map((d) => ({ ...d, cdArea: '00000' }))
  )

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
          <TableContent params={params} />
        </Suspense>
      </Box>
    </MainCard>
  )
}
