import { writeFile } from 'fs/promises'
import path from 'path'

import * as d3 from 'd3'
import { JSDOM } from 'jsdom'
import sharp from 'sharp'
import * as topojson from 'topojson-client'

import geoShapeData from 'data/topojson/prefecture.json'
import { CardProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

export interface D3MapChartSeries {
  areaCode: string
  areaName: string
  value: number
  unit: string
}

// 保存先のファイル名を生成
const generateFileName = (cardProps: CardProps, extension: string) => {
  const { fieldId, menuId, cardId } = cardProps
  const filename = `${cardId}.${extension}`
  const filePath = path.join(
    process.cwd(),
    'public',
    'ogp',
    fieldId,
    menuId,
    'prefecture-rank',
    filename
  )

  return filePath
}

const formatSeries = (values: RankingValueType[]) => {
  return values.map((d) => ({
    areaCode: d.areaCode,
    areaName: d.areaName,
    value: d.value,
    unit: d.unit,
  }))
}

export async function saveOgpPrefectureRank(
  title: string,
  cardProps: CardProps,
  values: RankingValueType[]
) {
  // seriesを整形
  const series = formatSeries(values)

  // JSDOMを使用して仮想DOMを作成
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const document = dom.window.document

  // SVG要素の作成
  const width = 800
  const height = 600
  const svg = d3
    .select(document.body)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('xmlns', 'http://www.w3.org/2000/svg')

  // 地図投影の設定
  const projection = d3
    .geoMercator()
    .center([137, 38])
    .scale(1200)
    .translate([width / 2, height / 2])

  const path = d3.geoPath().projection(projection)

  const geojson = topojson.feature(geoShapeData, geoShapeData.objects.pref)

  // カラースケールの設定
  const maxValue = d3.max(series, (d) => d.value) || 0
  const colorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([0, maxValue])

  // 地図の描画
  svg
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
    .attr('stroke', '#fff')
    .attr('stroke-width', 0.5)

  // SVGをファイルとして保存
  const svgString = document.body.innerHTML
  const svgFilePath = generateFileName(cardProps, 'svg')
  await writeFile(svgFilePath, svgString)

  // SVGをPNGに変換して保存
  const pngFilePath = generateFileName(cardProps, 'png')
  await sharp(Buffer.from(svgString)).png().toFile(pngFilePath)

  return 'public/japan_map.svg'
}
