'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DocumentType } from 'utils/document'
import { calcMedian } from 'utils/value/modules/calcMedian'
import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

interface Props {
  document: DocumentType
}

export default function Median({ document }: Props) {
  const { values, categories } = document
  const numbers = values.map((d) => d.value)
  const median = formatNumberJapanese(calcMedian(numbers))
  const unit = categories[0].categoryUnit

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
        中央値
      </Typography>
      <Typography variant="h5">
        {median}
        <Typography component="span" variant="subtitle1" sx={{ ml: 0.5 }}>
          {unit}
        </Typography>
      </Typography>
    </Box>
  )
}
