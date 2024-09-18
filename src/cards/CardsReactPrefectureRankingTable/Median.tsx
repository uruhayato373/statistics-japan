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
  const maxDecimalPlaces = getMaxDecimalPlaces(numbers)
  const unit = categories[0].categoryUnit

  // 中央値を指定した小数点以下の桁数に調整
  const formattedMedian = formatNumber(median, maxDecimalPlaces)

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle2" color="secondary">
        中央値
      </Typography>
      <Typography variant="h5">
        {formattedMedian}
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

// 数値の配列内の小数点以下の桁数の最大値を取得する
const getMaxDecimalPlaces = (numbers: number[]): number => {
  return Math.max(
    ...numbers.map((num) => {
      const decimalPart = num.toString().split('.')[1]
      return decimalPart ? decimalPart.length : 0
    })
  )
}

// 数値を指定した小数点以下の桁数に調整し、カンマ区切りで表示する
const formatNumber = (num: number, decimalPlaces: number): string => {
  const parts = num.toFixed(decimalPlaces).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
