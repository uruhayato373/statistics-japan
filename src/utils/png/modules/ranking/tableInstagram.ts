import getEnvVariable from 'utils/getEnvVariable'
import { ValueType } from 'utils/value'
import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

const BASE_URL = getEnvVariable('NEXT_PUBLIC_BASE_URL')

const generateTableInstagram = (
  title: string,
  bestValues: ValueType[],
  worstValues: ValueType[]
) => {
  // 色の配列
  const bestColors = ['#76b7b2', '#a4d4ae', '#d2e7aa', '#e7f0d2', '#f0f7e7']
  const worstColors = ['#f7b7a3', '#fac3b5', '#fdcfc7', '#fddbd5', '#fee7e3']

  // テーブル行を生成する関数
  const generateRows = (
    data: ValueType[],
    colors: string[],
    isWorst: boolean
  ) => {
    return data
      .map(
        (item, index) => `
      <g transform="translate(0, ${65 + index * 60})">
        <rect width="80" height="60" fill="${colors[index]}" stroke="white"/>
        <rect x="80" width="520" height="60" fill="${colors[index]}" stroke="white"/>
        <rect x="600" width="300" height="60" fill="${colors[index]}" stroke="white"/>
        <text x="40" y="40" text-anchor="middle" class="cell">${isWorst ? 47 - index : item.rank}</text>
        <text x="340" y="40" text-anchor="middle" class="cell">${item.areaName}</text>
        <text x="750" y="40" text-anchor="middle" class="number">${formatNumberJapanese(item.value)} ${item.unit}</text>
      </g>
    `
      )
      .join('')
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <style>
    .title { font: bold 40px sans-serif; }
    .header { font: bold 32px sans-serif; fill: white; }
    .cell { font: bold 26px sans-serif; fill: #333333; }
    .number { font: bold 24px sans-serif; fill: #333333; }
    .watermark { font: 24px sans-serif; fill: rgba(149, 165, 166, 0.5); }
  </style>

  <!-- 均一な青色の枠線 -->
  <rect x="5" y="5" width="1070" height="1070" fill="none" stroke="#4e79a7" stroke-width="10"/>

  <!-- 背景 -->
  <rect x="10" y="10" width="1060" height="1060" fill="#f0f0f0"/>

  <!-- タイトル（2行） -->
  <text x="540" y="120" text-anchor="middle" class="title">${title}</text>
  <text x="540" y="170" text-anchor="middle" class="title">都道府県ランキング</text>

  <!-- ベスト5 テーブル -->
  <g transform="translate(90, 220)">
    <rect width="900" height="65" fill="#4e79a7"/>
    <text x="450" y="45" text-anchor="middle" class="header">ベスト5</text>
    ${generateRows(bestValues, bestColors, false)}
  </g>

  <!-- ワースト5 テーブル -->
  <g transform="translate(90, 630)">
    <rect width="900" height="65" fill="#e15759"/>
    <text x="450" y="45" text-anchor="middle" class="header">ワースト5</text>
    ${generateRows(worstValues, worstColors, true)}
  </g>

  <!-- ウォーターマーク -->
  <text x="1060" y="1060" text-anchor="end" class="watermark">${BASE_URL}</text>
</svg>
  `
}

export default generateTableInstagram
