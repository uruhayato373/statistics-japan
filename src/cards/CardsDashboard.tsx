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

import { DashboardSingleContentsType } from 'utils/dashboard'

const iconSX = {
  fontSize: '0.75rem',
  color: 'inherit',
  marginLeft: 0,
  marginRight: 0,
}

type Props = {
  title?: string
  contents: DashboardSingleContentsType
  digit?: number
}

const formatNumber = (value: string | number, digit: number): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  return num.toLocaleString('ja-JP', {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  })
}

export default function CardsDashboardSingle({
  title,
  contents,
  digit = 0,
}: Props) {
  const { name, curTimeName, preTimeName, curValue, difference, rate, unit } =
    contents

  // titleの指定がない場合はnameをtitleにする
  const cardTitle = title ? title : name

  // 減少の場合はwarning、増加の場合はprimary
  const color = parseFloat(difference) < 0 ? 'warning' : 'primary'

  const formattedCurValue = formatNumber(curValue, digit)
  const formattedDifference = formatNumber(
    Math.abs(parseFloat(difference)),
    digit
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
          {cardTitle}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
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
                sx={{ ml: 1.25, pl: 1 }}
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
