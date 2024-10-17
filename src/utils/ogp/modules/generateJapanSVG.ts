/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as d3 from 'd3'
import { JSDOM } from 'jsdom'
import * as topojson from 'topojson-client'

import geoShapeData from 'data/topojson/prefecture.json'
import getEnvVariable from 'utils/getEnvVariable'

const BASE_URL = getEnvVariable('NEXT_PUBLIC_BASE_URL')

export default function generateJapanSVG(
  title: string,
  mapColor: string = '#a0d8ef'
): string {
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

  // Google Fontsを使用するためのスタイルを追加
  svg.append('defs').html(`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap');
    </style>
  `)

  // 背景色を設定
  svg
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', '#f0f4f8')

  // 枠線を追加
  svg
    .append('rect')
    .attr('x', 5)
    .attr('y', 5)
    .attr('width', width - 10)
    .attr('height', height - 10)
    .attr('fill', 'none')
    .attr('stroke', '#3273dc')
    .attr('stroke-width', 20)

  // 地図用のグループを作成
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

  // 地図の描画
  mapGroup
    .selectAll('path')
    .data(geojson.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', mapColor)
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 0.5)

  // タイトルを追加（2行に分けて表示）
  const titleGroup = svg.append('g').attr('transform', 'translate(100, 150)')

  titleGroup
    .append('text')
    .attr('y', 0)
    .attr('font-size', '70px')
    .attr('font-weight', 'bold')
    .attr('fill', '#2c3e50')
    .attr('font-family', "'Noto Sans JP', sans-serif")
    .text('日本の')

  titleGroup
    .append('text')
    .attr('y', 100) // 2行目の位置を調整
    .attr('font-size', '70px')
    .attr('font-weight', 'bold')
    .attr('fill', '#2c3e50')
    .attr('font-family', "'Noto Sans JP', sans-serif")
    .text(title)

  // 左下にウォーターマークを追加
  svg
    .append('text')
    .attr('x', 100)
    .attr('y', height - 70)
    .attr('font-size', '40px')
    .attr('fill', '#7f8c8d')
    .attr('font-family', "'Noto Sans JP', sans-serif")
    .text(BASE_URL)

  // SVGを文字列として返却
  return document.body.innerHTML
}
