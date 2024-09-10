'use client'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

export default function SourceCODH() {
  return (
    <Box m={2}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="caption" color="text.secondary">
        地図は『
        <Link
          href="https://geoshape.ex.nii.ac.jp/city/choropleth/jp_pref.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          歴史的行政区域データセットβ版
        </Link>
        』（CODH作成）を利用
      </Typography>
    </Box>
  )
}
