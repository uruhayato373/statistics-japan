'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DocumentType } from 'utils/document'

interface Props {
  document: DocumentType
}

export default function Average({ document }: Props) {
  const { categories, values } = document
  const numbers = values.map((d) => d.value)
  const average = calcAverage(numbers)
  const maxDecimalPlaces = getMaxDecimalPlaces(numbers)
  const unit = categories[0].categoryUnit

  // 平均値を指定した小数点以下の桁数に調整し、カンマ区切りで表示
  const formattedAverage = formatNumber(average, maxDecimalPlaces)

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle2" color="secondary">
        平均値
      </Typography>
      <Typography variant="h5">
        {formattedAverage}
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

// 数値の配列内の小数点以下の桁数の最大値を取得する
export const getMaxDecimalPlaces = (numbers: number[]): number => {
  return Math.max(
    ...numbers.map((num) => {
      const decimalPart = num.toString().split('.')[1]
      return decimalPart ? decimalPart.length : 0
    })
  )
}

// 数値を指定した小数点以下の桁数に調整し、カンマ区切りで表示する
export const formatNumber = (num: number, decimalPlaces: number): string => {
  const parts = num.toFixed(decimalPlaces).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
