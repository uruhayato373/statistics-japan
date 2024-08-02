'use client'

import React from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import { ApexChartTimeContentsType } from 'utils/apexcharts'

/**
 * ApexAreaChartのプロパティ型定義
 * @interface Props
 * @property {ApexChartTimeContentsType} contents - チャートのデータとカテゴリを含むオブジェクト
 */
interface Props {
  contents: ApexChartTimeContentsType
}

/**
 * エリアチャートを描画するコンポーネント
 * @param {Props} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ApexChartsを使用したエリアチャート
 */
export default function ApexAreaChart({ contents }: Props): JSX.Element {
  const { series, categories } = contents

  /**
   * チャートのオプション設定
   * @type {ApexOptions}
   */
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: categories,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={500}
    />
  )
}
