/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'

import FallOutlined from '@ant-design/icons/FallOutlined'
import RiseOutlined from '@ant-design/icons/RiseOutlined'

import formatApexcharts from 'utils/apexcharts'
import formatDashboard from 'utils/dashboard'
import { DocumentType } from 'utils/e-stat'

const iconSX = {
  fontSize: '0.75rem',
  color: 'inherit',
  marginLeft: 0,
  marginRight: 0,
}

type Props = {
  color?: string
  document: DocumentType
  children?: React.ReactNode
}

export default function CardsDashboardApex({
  color = 'primary',
  document,
  children,
}: Props) {
  // ダッシュボード用にデータを整形する。
  const dashboard = formatDashboard(document)
  const { name, value, rate, trend } = dashboard[0]

  // Apexcharts用にデータを整形する。
  const apexchart = formatApexcharts(document).TimeChart()

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2.25 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" color="text.secondary">
            {name}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="h4" color="inherit">
              {value}
            </Typography>
            {rate && trend !== 'flat' && (
              <Chip
                variant="combined"
                color={color}
                icon={
                  trend === 'down' ? (
                    <FallOutlined style={iconSX} />
                  ) : (
                    <RiseOutlined style={iconSX} />
                  )
                }
                label={`${rate}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            )}
          </Stack>
        </Stack>
      </Box>
      {children &&
        React.cloneElement(children as React.ReactElement, {
          contents: apexchart,
        })}
    </MainCard>
  )
}
