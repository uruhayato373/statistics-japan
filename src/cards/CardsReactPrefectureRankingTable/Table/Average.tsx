'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DocumentType } from 'utils/document'
import { calcAverage } from 'utils/value/modules/calcAverage'
import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

interface Props {
  document: DocumentType
}

export default function Average({ document }: Props) {
  const { categories, values } = document
  const numbers = values.map((d) => d.value).filter((f) => !isNaN(f))
  const average = formatNumberJapanese(calcAverage(numbers))
  const unit = categories[0].categoryUnit

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="subtitle2" color="secondary" sx={{ mb: 1 }}>
        平均値
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {average}
        <Typography component="span" variant="subtitle1" sx={{ ml: 0.5 }}>
          {unit}
        </Typography>
      </Typography>
    </Box>
  )
}
