'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DocumentType } from 'utils/document'

interface Props {
  document: DocumentType
}

export default function Median({ document }: Props) {
  const { values, categories } = document
  const numbers = values.map((d) => d.value)
  const median = calcMedian(numbers)
  const unit = categories[0].categoryUnit

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle2" color="secondary">
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

// 配列の中央値を計算する
const calcMedian = (numbers: number[]): number => {
  if (numbers.length === 0) return 0

  const sorted = numbers.slice().sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  } else {
    return sorted[middle]
  }
}
