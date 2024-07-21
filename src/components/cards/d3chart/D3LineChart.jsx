import { useEffect, useRef } from 'react'

import * as d3 from 'd3'

const data = [
  [
    { x: 0, y: 6 },
    { x: 1, y: 9 },
    { x: 2, y: 6 },
    { x: 3, y: 5 },
    { x: 4, y: 2 },
    { x: 6, y: 4 },
    { x: 7, y: 2 },
    { x: 8, y: 5 },
    { x: 9, y: 2 },
  ],
]

function D3LineChart() {
  const ref = useRef(null)

  const createLineChart = () => {
    const width = 500,
      height = 500,
      margin = 50,
      x = d3
        .scaleLinear()
        .domain([0, 10])
        .range([margin, width - margin]),
      y = d3
        .scaleLinear()
        .domain([0, 10])
        .range([height - margin, margin])

    const xStart = () => margin
    const yStart = () => height - margin
    const yEnd = () => margin
    const quadrantWidth = () => width - 2 * margin
    const quadrantHeight = () => height - 2 * margin

    //   d3.range(10).map(  (i) => { return {x: i, y: Math.sin(i) + 5}; })

    const line = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y))

    const svg = d3.select(ref.current)

    svg.attr('height', height).attr('width', width)

    svg
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', (d) => line(d))

    const renderAxes = (svg) => {
      const xAxis = d3
        .axisBottom()
        .scale(x.range([0, quadrantWidth()]))
        .scale(x)

      const yAxis = d3
        .axisLeft()
        .scale(y.range([quadrantHeight(), 0]))
        .scale(y)

      svg
        .append('g')
        .attr('class', 'axis')
        .attr('transform', () => {
          return 'translate(' + xStart() + ',' + yStart() + ')'
        })
        .call(xAxis)

      svg
        .append('g')
        .attr('class', 'axis')
        .attr('transform', () => {
          return 'translate(' + xStart() + ',' + yEnd() + ')'
        })
        .call(yAxis)
    }

    renderAxes(svg)
  }

  useEffect(() => {
    createLineChart()
  })

  return <svg ref={ref}> </svg>
}

export default D3LineChart
