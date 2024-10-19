/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import * as d3 from 'd3'
import * as topojson from 'topojson-client'

import geoShapeData from 'data/topojson/prefecture.json'
import getEnvVariable from 'utils/getEnvVariable'
import { ValueType } from 'utils/value'

const BASE_URL = getEnvVariable('NEXT_PUBLIC_BASE_URL')

const formatSeries = (values: ValueType[]) => {
  return values.map((d) => ({
    areaCode: d.areaCode,
    areaName: d.areaName,
    value: d.value,
    unit: d.unit,
  }))
}

export default function generatePrefectureRankSVG(
  title: string,
  values: ValueType[]
): string {
  // シリーズを整形
  const series = formatSeries(values)

  // SVG要素の作成
  const width = 1080
  const height = 1080

  // SVG文字列を直接生成
  let svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`

  // 背景色を設定
  svgString += `<rect width="${width}" height="${height}" fill="#f0f4f8"/>`

  // タイトルを追加（中央寄せ）
  svgString += `
    <g transform="translate(${width / 2}, 80)">
      <text text-anchor="middle" y="0" font-size="50px" font-weight="bold" fill="#2c3e50" font-family="'Noto Sans JP', sans-serif">${title}</text>
      <text text-anchor="middle" y="70" font-size="50px" font-weight="bold" fill="#2c3e50" font-family="'Noto Sans JP', sans-serif">都道府県ランキング</text>
    </g>
  `

  // 地図用のグループを作成（サイズを大きく）
  const mapWidth = 1000
  const mapHeight = 900

  // 地図投影の設定
  const projection = d3
    .geoMercator()
    .center([137, 38])
    .scale(2000)
    .translate([mapWidth / 2, mapHeight / 2])

  const path = d3.geoPath().projection(projection)

  // topojson.feature()の型エラーを解決するために型アサーションを使用
  const geojson = topojson.feature(
    geoShapeData as unknown,
    geoShapeData.objects.pref as unknown
  )

  // カラースケールの設定
  const maxValue = d3.max(series, (d) => d.value) || 0
  const colorScale = d3
    .scaleSequential()
    .domain([0, maxValue])
    .interpolator(d3.interpolateRgbBasis(['#e6f2ff', '#4a9ff5', '#1a56db']))

  // 地図の描画
  svgString += `<g transform="translate(${(width - mapWidth) / 2}, ${height - mapHeight - 20})">`
  geojson.features.forEach((feature: unknown) => {
    const prefCode = feature.properties.N03_007 + '000'
    const populationData = series.find((f) => f.areaCode === prefCode)
    const fillColor = colorScale(populationData ? populationData.value : 0)
    svgString += `<path d="${path(feature)}" fill="${fillColor}" stroke="#ffffff" stroke-width="0.5"/>`
  })
  svgString += '</g>'

  // ウォーターマークを追加（位置を少し上に調整）
  svgString += `<text x="40" y="${height - 30}" font-size="30px" fill="#7f8c8d" font-family="'Noto Sans JP', sans-serif">${BASE_URL}</text>`

  // 枠線を最後に追加（最前面に表示）
  svgString += `<rect x="5" y="5" width="${width - 10}" height="${height - 10}" fill="none" stroke="#3273dc" stroke-width="20" pointer-events="none"/>`

  // SVG終了タグ
  svgString += '</svg>'

  return svgString
}
