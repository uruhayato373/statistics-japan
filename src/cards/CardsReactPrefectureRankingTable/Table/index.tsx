import React from 'react'

import { Box, Grid } from '@mui/material'

import { RankingDocumentType } from 'utils/document'

import Average from './Average'
import Median from './Median'
import PrefectureRankingTable from './PrefectureRankingTable'

interface PrefectureRankingContentProps {
  document: RankingDocumentType
}

const StatisticsGrid: React.FC<{ document: RankingDocumentType }> = ({
  document,
}) => (
  <Grid container spacing={3}>
    <Grid item xs={12} lg={6}>
      <Average document={document} />
    </Grid>
    <Grid item xs={12} lg={6}>
      <Median document={document} />
    </Grid>
  </Grid>
)

const PrefectureRankingContent: React.FC<PrefectureRankingContentProps> = ({
  document,
}) => {
  return (
    <Box>
      <PrefectureRankingTable document={document} />
      <Box sx={{ mt: 2 }}>
        <StatisticsGrid document={document} />
      </Box>
    </Box>
  )
}

export default PrefectureRankingContent
