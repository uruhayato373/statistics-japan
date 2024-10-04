'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DocumentType } from 'utils/document'

interface Props {
  document: DocumentType
}

export default function Average({ document }: Props) {
  const { categories, values } = document
  const numbers = values.map((d) => d.value).filter((f) => !isNaN(f))
  const average = calcAverage(numbers)
  const unit = categories[0].categoryUnit

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle2" color="secondary">
        平均値
      </Typography>
      <Typography variant="h5">
        {average}
        <Typography component="span" variant="subtitle1" sx={{ ml: 0.5 }}>
          {unit}
        </Typography>
      </Typography>
    </Box>
  )
}

// 数値の配列の平均を計算する
export const calcAverage = (numbers: number[]): number => {
  return calcSum(numbers) / numbers.length
}

// 数値の配列の合計を計算する
export const calcSum = (numbers: number[]): number => {
  return numbers.reduce((acc, cur) => acc + cur, 0)
}

// 数値を指定した小数点以下の桁数に調整し、カンマ区切りで表示する
export const formatNumber = (num: number, decimalPlaces: number): string => {
  const parts = num.toFixed(decimalPlaces).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
