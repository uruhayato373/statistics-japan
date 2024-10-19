import { ValueType } from 'utils/value'

const generateTableTickTok = (title: string, values: ValueType[]) => {
  const unit = values[0]?.unit || ''
  const rowHeight = 76
  const rowsPerColumn = 24
  const totalRows = 48 // 常に48行分の背景を描画

  const generateRow = (rank, name, value, x, y) => `
    <g transform="translate(${x}, ${y})" class="row">
      <rect x="0" y="0" width="500" height="${rowHeight}" />
      ${
        rank
          ? `
        <text x="40" y="${rowHeight / 2 + 8}" class="rank">${rank}</text>
        <text x="100" y="${rowHeight / 2 + 8}" class="label">${name}</text>
        <text x="460" y="${rowHeight / 2 + 8}" class="value">${value.toLocaleString()} <tspan class="unit">${unit}</tspan></text>
      `
          : ''
      }
    </g>
  `

  const generateColumn = (startIndex, x) => {
    let rows = ''
    for (let i = 0; i < rowsPerColumn; i++) {
      const item = values[startIndex + i]
      if (item) {
        rows += generateRow(
          startIndex + i + 1,
          item.areaName,
          item.value,
          x,
          i * rowHeight
        )
      } else {
        // データがない場合は背景のみ描画
        rows += generateRow(null, '', '', x, i * rowHeight)
      }
    }
    return rows
  }

  const svgHeight = 130 + (totalRows * rowHeight) / 2 + 40 // タイトル + 表の高さ + 下部マージン

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 ${svgHeight}">
      <style>
        .title { font: bold 48px sans-serif; fill: #ffffff; }
        .label { font: bold 24px sans-serif; fill: #ffffff; }
        .value { font: 24px sans-serif; text-anchor: end; fill: #ffffff; }
        .unit { font: 18px sans-serif; fill: #cccccc; }
        .rank { font: bold 28px sans-serif; text-anchor: middle; fill: #ffffff; }
        .row:nth-child(even) rect { fill: #2a3f5f; }
        .row:nth-child(odd) rect { fill: #192841; }
      </style>

      <rect width="100%" height="100%" fill="#0f1c2e"/>

      <text x="540" y="80" class="title" text-anchor="middle">${title}</text>

      <g transform="translate(40, 130)">
        <rect x="0" y="0" width="1000" height="${(totalRows * rowHeight) / 2}" fill="#192841" stroke="#4a5d7e"/>

        <g transform="translate(0, 0)">
          ${generateColumn(0, 0)}
        </g>

        <g transform="translate(500, 0)">
          ${generateColumn(rowsPerColumn, 0)}
        </g>
      </g>
    </svg>
  `
}

export default generateTableTickTok
