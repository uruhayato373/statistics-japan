'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ReactSortingTable from 'components/table/ReactSortingTable'
import SimpleBar from 'components/third-party/SimpleBar'

import { ReactRankTableType } from 'utils/table'

interface Props {
  contents: ReactRankTableType
}

export default function PrefectureRankingTable({ contents }: Props) {
  const { averageString, medianString } = contents

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SimpleBar
        sx={{
          flex: 1,
          minHeight: 0, // これにより、SimpleBarが必要最小限のサイズになります
        }}
      >
        <ReactSortingTable contents={contents} />
      </SimpleBar>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ mt: 2, flexShrink: 0 }} // マージントップを追加し、縮小を防ぎます
      >
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Typography variant="subtitle2" color="secondary">
            平均値
          </Typography>
          <Typography variant="h5">{averageString}</Typography>
        </Stack>
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Typography variant="subtitle2" color="secondary">
            中央値
          </Typography>
          <Typography variant="h5">{medianString}</Typography>
        </Stack>
      </Grid>
    </Box>
  )
}
