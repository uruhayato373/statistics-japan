'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DocumentType } from 'utils/document'
interface Props {
  document: DocumentType
}

export default function Median({ document }: Props) {
  const { values } = document
  const numbers = values.map((d) => d.value)
  const median = calcMedian(numbers)

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle2" color="secondary">
        中央値
      </Typography>
      <Typography variant="h5">{median}</Typography>
    </Box>
  )
}

/**
 * 配列の中央値を計算する
 * @param {number[]} numbers - 中央値を求める数値の配列
 * @returns {number} 中央値
 */
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
