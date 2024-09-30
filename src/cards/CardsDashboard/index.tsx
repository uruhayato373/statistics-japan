/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'

import FallOutlined from '@ant-design/icons/FallOutlined'
import RiseOutlined from '@ant-design/icons/RiseOutlined'

import formatDashboard from 'utils/dashboard'
import { DocumentType } from 'utils/document'

const iconSX = {
  fontSize: '0.75rem',
  color: 'inherit',
  marginLeft: 0,
  marginRight: 0,
}

type Props = {
  title: string
  document: DocumentType
  digit?: number
}

const formatNumber = (
  value: string | number | null | undefined,
  digit: number
): string => {
  if (value === null || value === undefined) return 'N/A'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return 'N/A'
  return num.toLocaleString('ja-JP', {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  })
}

// 小数点以下の桁数を取得
function getDecimalPlaces(num: number): number {
  if (Math.floor(num) === num) return 0
  const decimalPart = num.toString().split('.')[1]
  return decimalPart ? decimalPart.length : 0
}

// 配列内の最大の小数点以下の桁数を取得
function getMaxDecimalPlaces(numbers: number[]): number {
  return Math.max(...numbers.map(getDecimalPlaces))
}

export default function CardsDashboard({ title, document, digit }: Props) {
  const contents = formatDashboard(document).single()

  const formatDigit = digit
    ? digit
    : getMaxDecimalPlaces(document.values.map((d) => d.value))

  const { curTimeName, preTimeName, curValue, difference, rate, unit } =
    contents

  // 減少の場合はwarning、増加の場合はprimary
  const color = parseFloat(difference) < 0 ? 'warning' : 'primary'

  const formattedCurValue = formatNumber(curValue, formatDigit)
  const formattedDifference = formatNumber(
    Math.abs(parseFloat(difference)),
    formatDigit
  )

  const getDifferenceText = () => {
    const diffValue = parseFloat(difference)
    if (diffValue === 0) return '増減なし'
    return (
      <>
        <Typography
          component="span"
          variant="caption"
          sx={{ color: `${color || 'primary'}.main` }}
        >
          {' '}
          {formattedDifference}{' '}
        </Typography>
        {unit}
        {diffValue < 0 ? ' 減少' : ' 増加'}
      </>
    )
  }

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h5" color="inherit">
              {formattedCurValue} {unit}
            </Typography>
          </Grid>
          {rate !== null && rate !== undefined && rate !== 0 && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={
                  rate < 0 ? (
                    <FallOutlined style={iconSX} />
                  ) : (
                    <RiseOutlined style={iconSX} />
                  )
                }
                label={`${rate}%`}
                sx={{
                  ml: 1.25,
                  pl: 1,
                  height: '20px', // チップの高さを小さく
                  '& .MuiChip-label': {
                    padding: '0 6px',
                    fontSize: '0.65rem', // フォントサイズを小さく
                  },
                  '& .MuiChip-icon': {
                    fontSize: '0.65rem', // アイコンのサイズも小さく
                    marginLeft: '4px',
                  },
                }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
        <Typography variant="caption" color="text.secondary">
          {curTimeName}
        </Typography>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="text.secondary">
          {preTimeName}から
          {getDifferenceText()}
        </Typography>
      </Box>
    </MainCard>
  )
}
