/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import Dot from 'components/@extended/Dot'
import MainCard from 'components/MainCard'

import MoreOutlined from '@ant-design/icons/MoreOutlined'
import ReactApexChart from 'react-apexcharts'

// chart options
const areaChartOptions = {
  chart: {
    width: 350,
    type: 'donut',
    stacked: false,
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    donut: {
      size: '15%',
    },
  },
  stroke: {
    width: 0,
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
  legend: {
    show: false,
  },
}

export default function CardsApexPie() {
  const theme = useTheme()
  // const { mode } = useConfig();

  const downMD = useMediaQuery(theme.breakpoints.down('md'))

  const [options] = useState(areaChartOptions)

  const [series, setSeries] = useState([44, 55, 41, 17, 15])

  useEffect(() => {
    setSeries([44, 55, 41, 17, 15])
  }, [])

  //sx style
  const DotSize = { display: 'flex', alignItems: 'center', gap: 1 }
  const ExpenseSize = {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 500,
  }

  return (
    <MainCard
      title="Total Expenses"
      secondary={
        <IconButton edge="end" aria-label="comments" color="secondary">
          <MoreOutlined style={{ fontSize: '1.15rem' }} />
        </IconButton>
      }
      sx={{
        '.pie_box': {
          padding: 2,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          width: '100%',
        },
        '.PieDot': { width: 12, height: 12, borderRadius: '50%' },
        '.fontsize': {
          fontWeight: 500,
          fontSize: '0.875rem',
          lineHeight: '1.375rem',
          color: theme.palette.secondary.main,
        },
        '.fontsizeValue': { color: theme.palette.secondary.dark },
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid
          item
          xs={12}
          sx={{ '& .apexcharts-canvas': { margin: '0 auto' } }}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={downMD ? '100%' : 265}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot color="warning" size={12} />
              <Typography variant="subtitle1" color="text.secondary">
                Pending
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              $3,202
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot color="success" size={12} />
              <Typography variant="subtitle1" color="text.secondary">
                Paid
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              $45,050
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot color="error" size={12} />
              <Typography variant="subtitle1" color="text.secondary">
                Overdue
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              $25,000
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item></Grid>
            <Grid item xs sx={DotSize}>
              <Dot sx={{ bgcolor: 'primary.lighter' }} size={12} />
              <Typography variant="subtitle1" color="text.secondary">
                Draft
              </Typography>
            </Grid>
            <Grid item sx={ExpenseSize}>
              $7,694
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  )
}
