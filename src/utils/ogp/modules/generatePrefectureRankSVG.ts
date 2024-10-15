/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import * as d3 from 'd3'
import { JSDOM } from 'jsdom'
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

export default async function generatePrefectureRankSVG(
  title: string,
  values: ValueType[]
) {
  // seriesを整形
  const series = formatSeries(values)

  // JSDOMを使用して仮想DOMを作成
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const document = dom.window.document

  // SVG要素の作成
  const width = 1200
  const height = 630
  const svg = d3
    .select(document.body)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('xmlns', 'http://www.w3.org/2000/svg')

  // 背景色を変更
  svg
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', '#f0f4f8') // 薄い青みがかったグレー

  // 枠線を追加（色をより洗練されたものに変更）
  svg
    .append('rect')
    .attr('x', 5)
    .attr('y', 5)
    .attr('width', width - 10)
    .attr('height', height - 10)
    .attr('fill', 'none')
    .attr('stroke', '#3273dc') // より落ち着いた青色
    .attr('stroke-width', 20)

  // 地図用のグループを作成し、右寄りかつ下方に配置
  const mapWidth = 800
  const mapHeight = 700
  const mapGroup = svg
    .append('g')
    .attr(
      'transform',
      `translate(${width - mapWidth + 50}, ${(height - mapHeight) / 2 + 20})`
    )

  // 地図投影の設定
  const projection = d3
    .geoMercator()
    .center([137, 38])
    .scale(1600)
    .translate([mapWidth / 2, mapHeight / 2])

  const path = d3.geoPath().projection(projection)

  const geojson = topojson.feature(geoShapeData, geoShapeData.objects.pref)

  // カラースケールの設定（より洗練されたグラデーションに変更）
  const maxValue = d3.max(series, (d) => d.value) || 0
  const colorScale = d3
    .scaleSequential()
    .domain([0, maxValue])
    .interpolator(d3.interpolateRgbBasis(['#e6f2ff', '#4a9ff5', '#1a56db']))

  // 地図の描画
  mapGroup
    .selectAll('path')
    .data(geojson.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', (d) => {
      const prefCode = d.properties.N03_007 + '000'
      const populationData = series.find((f) => f.areaCode === prefCode)
      return colorScale(populationData ? populationData.value : 0)
    })
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 0.5)

  // タイトルを追加（右下に移動し、行間を空ける）
  const titleGroup = svg.append('g').attr('transform', 'translate(100, 150)')

  titleGroup
    .append('text')
    .attr('y', 0)
    .attr('font-size', '70px')
    .attr('font-weight', 'bold')
    .attr('fill', '#2c3e50') // より深みのある色
    .text(title)

  titleGroup
    .append('text')
    .attr('y', 100)
    .attr('font-size', '70px')
    .attr('font-weight', 'bold')
    .attr('fill', '#2c3e50') // より深みのある色
    .text('都道府県ランキング')

  // 左下にウォーターマークを追加
  svg
    .append('text')
    .attr('x', 100)
    .attr('y', height - 70)
    .attr('font-size', '40px')
    .attr('fill', '#7f8c8d') // より洗練された薄いグレー
    .text(BASE_URL)

  return document.body.innerHTML
}
