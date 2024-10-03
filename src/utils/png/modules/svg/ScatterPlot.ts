import * as fs from 'fs'

import * as d3 from 'd3'
import { JSDOM } from 'jsdom'

import { D3ScatterContentsType } from 'utils/d3charts'

export default function generateScatterPlot(
  title: string,
  contents: D3ScatterContentsType
): string {
  // JSDOMを使用して仮想DOMを作成
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const document = dom.window.document

  // SVGのサイズとマージンの設定
  const width = 800
  const height = 600
  const margin = { top: 130, right: 100, bottom: 100, left: 160 } // マージンを調整
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // フォント設定
  const fontFamily = 'NotoSansJP-Bold'
  const axisColor = '#333333' // 濃いグレー

  // フォントファイルの読み込み
  const fontPath = 'public/fonts/NotoSansJP-Bold.ttf'
  const fontBuffer = fs.readFileSync(fontPath)
  const fontBase64 = fontBuffer.toString('base64')

  // SVG要素の作成
  const svg = d3
    .select(document.body)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('xmlns', 'http://www.w3.org/2000/svg')

  // フォントの定義を追加
  const defs = svg.append('defs')
  defs.append('style').attr('type', 'text/css').text(`
      @font-face {
        font-family: '${fontFamily}';
        src: url(data:font/ttf;base64,${fontBase64}) format('truetype');
        font-weight: bold;
        font-style: normal;
      }
    `)

  // 背景を白にする
  svg
    .append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'white')

  // 外枠を追加
  svg
    .append('rect')
    .attr('x', 5)
    .attr('y', 5)
    .attr('width', width - 10)
    .attr('height', height - 10)
    .attr('fill', 'none')
    .attr('stroke', '#0047AB')
    .attr('stroke-width', 10)

  // グラフ領域のグループを作成
  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // スケールの設定
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(contents.series, (d) => d.x) as [number, number])
    .range([0, innerWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(contents.series, (d) => d.y) as [number, number])
    .range([innerHeight, 0])
    .nice()

  // 軸の設定
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // X軸の描画
  g.append('g')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(xAxis)
    .attr('font-family', fontFamily)

  // X軸のタイトル
  g.append('text')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight + 60) // 位置を下に調整
    .attr('text-anchor', 'middle')
    .attr('fill', axisColor)
    .attr('font-size', '16px')
    .attr('font-family', fontFamily)
    .text(contents.categories[0].categoryName)

  // Y軸の描画
  g.append('g').call(yAxis).attr('font-family', fontFamily)

  // Y軸のタイトル
  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -120) // 位置を左に調整
    .attr('x', -innerHeight / 2)
    .attr('text-anchor', 'middle')
    .attr('fill', axisColor)
    .attr('font-size', '16px')
    .attr('font-family', fontFamily)
    .text(contents.categories[1].categoryName)

  // 散布図の点を描画
  g.selectAll('circle')
    .data(contents.series)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
    .attr('r', 5)
    .attr('fill', 'steelblue')

  // トレンドラインの描画
  const lineFunction = d3
    .line<{ x: number; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))

  g.append('path')
    .datum([
      { x: d3.min(contents.series, (d) => d.x) as number, y: 0 },
      { x: d3.max(contents.series, (d) => d.x) as number, y: 0 },
    ])
    .attr('d', lineFunction)
    .attr('stroke', '#404040')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  // タイトルの追加
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr('font-size', '24px')
    .attr('font-weight', 'bold')
    .attr('font-family', fontFamily)
    .text(title)

  // 相関係数の追加
  svg
    .append('text')
    .attr('x', width - margin.right)
    .attr('y', 90) // 位置を下に調整
    .attr('text-anchor', 'end')
    .attr('font-size', '18px') // フォントサイズを大きく
    .attr('font-weight', 'bold') // 太字に
    .attr('font-family', fontFamily)
    .text(`相関係数: ${contents.correlationCoefficient.toFixed(4)}`)

  return document.body.innerHTML
}
