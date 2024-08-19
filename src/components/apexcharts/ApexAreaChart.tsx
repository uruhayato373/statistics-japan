'use client'

import React, { useEffect, useState } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  propOptions: ApexOptions
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'area',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    labels: {
      show: false, // xaxisのラベルを非表示
    },
    axisBorder: {
      show: false, // x軸の境界線を非表示
    },
    axisTicks: {
      show: false, // x軸の目盛りを非表示
    },
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
}

export default function ApexAreaChart({ propOptions }: Props): JSX.Element {
  const [options, setOptions] = useState<ApexOptions>({
    ...defaultOptions,
    ...propOptions,
  })

  useEffect(() => {
    const handleResize = () => {
      const isXsScreen = window.innerWidth < 576 // Assuming xs is below 576px

      setOptions((prevOptions) => ({
        ...prevOptions,
        yaxis: {
          ...prevOptions.yaxis,
          show: !isXsScreen,
        },
      }))
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={350}
    />
  )
}
