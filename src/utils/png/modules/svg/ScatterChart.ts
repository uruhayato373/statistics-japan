import * as d3 from 'd3'
import { JSDOM } from 'jsdom'

interface Data {
  x: number
  y: number
}

export default function generateScatterPlot(data: Data[]): string {
  // JSDOMを使用して仮想DOMを作成
  const dom = new JSDOM('<!DOCTYPE html><body></body>')
  const document = dom.window.document

  // SVGのサイズとマージンの設定
  const width = 800
  const height = 600
  const margin = { top: 50, right: 50, bottom: 50, left: 50 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // SVG要素の作成
  const svg = d3
    .select(document.body)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('xmlns', 'http://www.w3.org/2000/svg')

  // グラフ領域のグループを作成
  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // スケールの設定
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.x) as [number, number])
    .range([0, innerWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.y) as [number, number])
    .range([innerHeight, 0])
    .nice()

  // 軸の設定
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  // X軸の描画
  g.append('g')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(xAxis)
    .append('text')
    .attr('x', innerWidth / 2)
    .attr('y', 40)
    .attr('fill', 'black')
    .text('X軸')

  // Y軸の描画
  g.append('g')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -40)
    .attr('x', -innerHeight / 2)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .text('Y軸')

  // 散布図の点を描画
  g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
    .attr('r', 5)
    .attr('fill', 'steelblue')

  // タイトルの追加
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', 30)
    .attr('text-anchor', 'middle')
    .attr('font-size', '20px')
    .attr('font-weight', 'bold')
    .text('散布図')

  return document.body.innerHTML
}
