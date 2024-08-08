/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import { useEffect, useRef, useState } from 'react'

import * as d3 from 'd3'
import * as topojson from 'topojson-client'

import { D3ChartMapContentsType } from 'utils/d3charts'
import { TopoJSONData } from 'utils/geoshape'

/**
 * D3MapChartコンポーネントのプロパティ型定義
 * @interface Props
 */
interface Props {
  /** チャートのデータ内容 */
  contents: D3ChartMapContentsType
  /** 地図の地理的形状データ */
  geoShape: TopoJSONData
}

/**
 * D3.jsを使用して日本地図のインタラクティブな可視化を行うコンポーネント
 * @param {Props} props - コンポーネントのプロパティ
 */
export default function D3MapChart({ contents, geoShape }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1200)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const { series } = contents

  // コンポーネントのリサイズ処理
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height: 450 }) // アスペクト比を調整
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 地図の描画と更新
  useEffect(() => {
    if (geoShape && svgRef.current && dimensions.width > 0) {
      const { width, height } = dimensions

      // SVG要素の設定
      const svg = d3
        .select(svgRef.current)
        .attr('width', width)
        .attr('height', height)

      svg.selectAll('*').remove() // 以前の内容をクリア

      const g = svg.append('g')

      // 地図投影の設定
      const projection = d3
        .geoMercator()
        .center([137, 38])
        .scale(zoomLevel * (width / 400))
        .translate([width / 2, height / 2])

      const geojson = topojson.feature(geoShape, geoShape.objects.pref)

      // カラースケールの設定
      const maxValue = d3.max(series, (d) => d.value) || 0
      const colorScale = d3
        .scaleSequential(d3.interpolateBlues)
        .domain([0, maxValue])

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

      /**
       * 地図のパスを更新する関数
       * @param {d3.ZoomTransform | undefined} transform - ズーム変換オブジェクト
       */
      const updatePaths = (transform) => {
        const newProjection = transform
          ? projection
              .scale(zoomLevel * (width / 400) * transform.k)
              .translate([transform.x + width / 2, transform.y + height / 2])
          : projection

        const newPath = d3.geoPath().projection(newProjection)

        g.selectAll('path')
          .data(geojson.features)
          .join('path')
          .attr('d', newPath)
          .attr('fill', (d) => {
            const prefCode = d.properties.N03_007 + '000'
            const populationData = series.find((f) => f.areaCode === prefCode)
            return colorScale(populationData ? populationData.value : 0)
          })
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5 / (transform ? transform.k : 1))
          .style('pointer-events', 'all')
          .on('mouseover', (event, d) => {
            const prefCode = d.properties.N03_007 + '000'
            const populationData = series.find((f) => f.areaCode === prefCode)
            tooltip.style('display', null)
            tooltip
              .select('text')
              .text(
                `${d.properties.N03_001}: ${
                  populationData ? populationData.value.toLocaleString() : 'N/A'
                }`
              )
          })
          .on('mousemove', (event) => {
            const [x, y] = d3.pointer(event)
            tooltip.attr(
              'transform',
              `translate(${x},${y - 40}) scale(${1 / (transform ? transform.k : 1)})`
            )
          })
          .on('mouseout', () => {
            tooltip.style('display', 'none')
          })
      }

      updatePaths()

      // ズーム機能の設定
      const zoom = d3
        .zoom()
        .scaleExtent([0.5, 10])
        .on('zoom', (event) => {
          updatePaths(event.transform)
        })

      svg.call(zoom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document, zoomLevel, geoShape, dimensions, series])

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: 'auto' }}></svg>
      <div>
        <label>
          Zoom Level:
          <input
            type="range"
            min="500"
            max="5000"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  )
}
