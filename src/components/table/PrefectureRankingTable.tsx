'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
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
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <Box sx={{ height: '400px', width: '100%' }}>
          <SimpleBar sx={{ maxHeight: '100%', width: '100%' }}>
            <ReactSortingTable contents={contents} />
          </SimpleBar>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" color="secondary">
            平均値
          </Typography>
          <Typography variant="h5">{averageString}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" color="secondary">
            中央値
          </Typography>
          <Typography variant="h5">{medianString}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
