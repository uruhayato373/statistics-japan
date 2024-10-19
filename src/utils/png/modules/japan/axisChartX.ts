import * as d3 from 'd3'

import { DocumentType } from 'utils/document'

export function generateAxisChartX(
  title: string,
  document: DocumentType
): string {
  const width = 1200
  const height = 630
  const margin = { top: 120, right: 120, bottom: 80, left: 120 }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // 特定の年のデータのみをフィルタリング
  const targetYears = ['1980', '1990', '2000', '2010', '2020']
  const filteredTimes = document.times.filter((t) =>
    targetYears.includes(t.timeCode)
  )
  const timeNames = filteredTimes.map((t) => t.timeName)

  // categories[0]のデータのみを使用
  const category = document.categories[0]
  const filteredValues = document.values.filter(
    (v) =>
      v.categoryCode === category.categoryCode &&
      targetYears.includes(v.timeCode)
  )

  const x = d3.scaleBand().domain(timeNames).range([0, chartWidth]).padding(0.3)
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(filteredValues, (d) => d.value) || 0])
    .range([chartHeight, 0])

  // SVG文字列の構築開始
  let svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="max-width: 100%; height: auto;">
    <rect width="${width}" height="${height}" fill="white"/>
    <text x="${width / 2}" y="50" text-anchor="middle" font-family="sans-serif" font-size="36" font-weight="bold" fill="#333">${title}</text>
    <g transform="translate(${margin.left},${margin.top})">`

  // X軸を手動で生成
  svgString += `<g transform="translate(0,${chartHeight})">
    <path d="M0,0H${chartWidth}" fill="none" stroke="#666" stroke-width="2"/>
    ${x
      .domain()
      .map((tick) => {
        const xPos = x(tick)! + x.bandwidth() / 2
        return `<g transform="translate(${xPos},0)">
        <line y2="6" stroke="#666" stroke-width="2"/>
        <text y="25" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#333">${tick}</text>
      </g>`
      })
      .join('')}
  </g>`

  // Y軸を手動で生成
  svgString += `<g>
    <path d="M0,0V${chartHeight}" fill="none" stroke="#666" stroke-width="2"/>
    ${y
      .ticks(5)
      .map(
        (tick) => `
      <g transform="translate(0,${y(tick)})">
        <line x2="-6" stroke="#666" stroke-width="2"/>
        <text x="-10" dy="0.32em" text-anchor="end" font-family="sans-serif" font-size="16" fill="#333">${d3.format(',')(tick)}</text>
      </g>
    `
      )
      .join('')}
  </g>`

  // 棒グラフの描画
  const barColor = '#4e79a7' // 棒グラフの色
  filteredValues.forEach((d) => {
    const xPos = x(
      document.times.find((t) => t.timeCode === d.timeCode)?.timeName || ''
    )!
    const barHeight = chartHeight - y(d.value)
    svgString += `<rect x="${xPos}" y="${y(d.value)}" width="${x.bandwidth()}" height="${barHeight}" fill="${barColor}" />`

    // 値と単位をバーの上に表示
    svgString += `
      <text x="${xPos + x.bandwidth() / 2}" y="${y(d.value) - 20}" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#333">
        ${d3.format(',')(d.value)}
      </text>
      <text x="${xPos + x.bandwidth() / 2}" y="${y(d.value) - 5}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#666">
        ${category.categoryUnit}
      </text>`
  })

  // SVG文字列の終了
  svgString += '</g></svg>'

  return svgString
}
