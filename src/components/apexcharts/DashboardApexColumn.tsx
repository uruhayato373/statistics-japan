/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'

import ReactApexChart from 'react-apexcharts'

import { ThemeMode } from 'config'
import useConfig from 'hooks/useConfig'
import { ApexChartTimeContentsType } from 'utils/apexcharts'

interface Props {
  contents: ApexChartTimeContentsType
}

export default function DashboardApexColumn({ contents }: Props) {
  const theme = useTheme()
  const { mode } = useConfig()

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      sparkline: {
        enabled: true,
      },
      height: 100,
      type: 'bar',
      toolbar: {
        show: false,
      },
      offsetX: -4,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter(val) {
          return `$ ${val}`
        },
      },
    },
    yaxis: {
      min: Math.min(...contents.series[0].data) - 10000,
      max: Math.max(...contents.series[0].data) + 10000,
    },
  }

  const { primary, secondary } = theme.palette.text
  const line = theme.palette.divider

  const [options, setOptions] = useState(areaChartOptions)

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light',
      },
      yaxis: {
        min: Math.min(...series[0].data) - 10000,
        max: Math.max(...series[0].data) + 10000,
      },
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, primary, secondary, line, theme])

  const [series] = useState(contents.series)

  return (
    <ReactApexChart options={options} series={series} type="bar" height={100} />
  )
}
