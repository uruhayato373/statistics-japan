'use client'

import React, { useEffect, useRef, useState } from 'react'

import * as d3 from 'd3'

import { CategoryType } from 'utils/e-stat'

interface Props {
  contents: {
    categories: CategoryType[]
    series: {
      name: string
      x: number
      y: number
    }[]
  }
}

const D3ScatterChart: React.FC<Props> = ({ contents }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 })

  const { categories, series } = contents

  // マージンの設定
  const margin = { top: 30, right: 30, bottom: 50, left: 50 }

  // コンポーネントのリサイズ処理
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: width - margin.left - margin.right,
          height: width - margin.left - margin.right,
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    // SVG要素をクリア
    d3.select(svgRef.current).selectAll('*').remove()

    const { width, height } = dimensions
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // SVG要素の作成
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // スケールの設定
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(series, (d) => d.x))
      .nice()
      .range([0, innerWidth])

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(series, (d) => d.y))
      .nice()
      .range([innerHeight, 0])

    // x軸のタイトル
    svg
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text(`${categories[0].categoryName}`)

    // y軸のタイトル
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -margin.left + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text(`${categories[1].categoryName}`)

    // グリッド線を描画
    svg
      .append('g')
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.1)
      .call((g) =>
        g
          .append('g')
          .selectAll('line')
          .data(xScale.ticks())
          .join('line')
          .attr('x1', (d) => 0.5 + xScale(d))
          .attr('x2', (d) => 0.5 + xScale(d))
          .attr('y1', 0)
          .attr('y2', innerHeight)
      )
      .call((g) =>
        g
          .append('g')
          .selectAll('line')
          .data(yScale.ticks())
          .join('line')
          .attr('y1', (d) => 0.5 + yScale(d))
          .attr('y2', (d) => 0.5 + yScale(d))
          .attr('x1', 0)
          .attr('x2', innerWidth)
      )

    // 回帰直線の計算
    const xMean = d3.mean(series, (d) => d.x) || 0
    const yMean = d3.mean(series, (d) => d.y) || 0
    const ssxx = d3.sum(series, (d) => Math.pow(d.x - xMean, 2))
    const ssxy = d3.sum(series, (d) => (d.x - xMean) * (d.y - yMean))
    const slope = ssxy / ssxx
    const intercept = yMean - slope * xMean

    // 回帰直線の描画
    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(slope * d.x + intercept))

    svg
      .append('path')
      .datum([
        { x: d3.min(series, (d) => d.x) || 0, y: 0 },
        { x: d3.max(series, (d) => d.x) || 0, y: 0 },
      ])
      .attr('class', 'regression-line')
      .attr('d', line)
      .style('stroke', 'red')
      .style('stroke-width', 2)

    // 散布図の点を描画
    svg
      .append('g')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('fill', 'none')
      .selectAll('circle')
      .data(series)
      .join('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 3)

    // ツールチップの設定
    const tooltip = svg
      .append('g')
      .attr('class', 'tooltip')
      .style('display', 'none')

    tooltip
      .append('rect')
      .attr('width', 120)
      .attr('height', 40)
      .attr('fill', 'white')
      .style('opacity', 0.8)

    tooltip.append('text').attr('x', 5).attr('y', 20)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents, dimensions, series])

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: 'auto' }}></svg>
    </div>
  )
}

export default D3ScatterChart
