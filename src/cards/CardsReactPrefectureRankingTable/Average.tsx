'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DocumentType } from 'utils/document'

interface Props {
  document: DocumentType
}

export default function Average({ document }: Props) {
  const { values } = document
  const numbers = values.map((d) => d.value)
  const average = calcAverage(numbers)

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle2" color="secondary">
        平均値
      </Typography>
      <Typography variant="h5">{average}</Typography>
    </Box>
  )
}

/**
 * 数値の配列の平均を計算する
 * @param {number[]} numbers - 平均を求める数値の配列
 * @returns {number} 平均値
 */
export const calcAverage = (numbers: number[]): number => {
  return calcSum(numbers) / numbers.length
}

/**
 * 数値の配列の合計を計算する
 * @param {number[]} numbers - 合計を求める数値の配列
 * @returns {number} 合計値
 */
export const calcSum = (numbers: number[]): number => {
  return numbers.reduce((acc, cur) => acc + cur, 0)
}
