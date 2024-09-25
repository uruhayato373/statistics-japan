import fs from 'fs/promises'
import path from 'path'

import sharp from 'sharp'

import { CardProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

// SVGを生成
const generateSvg = (title: string, values: RankingValueType[]) => {
  // ベスト5とワースト5を抽出
  const best5 = values.slice(0, 5)
  const worst5 = values.slice(-5).reverse()

  // 年次を取得
  const timeName = values[0].timeName

  // 色の配列
  const bestColors = ['#76b7b2', '#a4d4ae', '#d2e7aa', '#e7f0d2', '#f0f7e7']
  const worstColors = ['#f7b7a3', '#fac3b5', '#fdcfc7', '#fddbd5', '#fee7e3']

  // テーブル行を生成する関数
  const generateRows = (
    data: RankingValueType[],
    colors: string[],
    isWorst: boolean
  ) => {
    return data
      .map(
        (item, index) => `
      <g transform="translate(0, ${70 + index * 60})">
        <rect width="60" height="60" fill="${colors[index]}" stroke="white"/>
        <rect x="60" width="240" height="60" fill="${colors[index]}" stroke="white"/>
        <rect x="300" width="200" height="60" fill="${colors[index]}" stroke="white"/>
        <text x="30" y="40" text-anchor="middle" class="cell">${isWorst ? 47 - index : item.rank}</text>
        <text x="180" y="40" text-anchor="middle" class="cell">${item.areaName}</text>
        <text x="400" y="40" text-anchor="middle" class="number">${item.value.toLocaleString()} ${item.unit}</text>
      </g>
    `
      )
      .join('')
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <style>
        .title { font: bold 40px sans-serif; }
        .header { font: bold 32px sans-serif; fill: white; }
        .cell { font: bold 26px sans-serif; fill: #333333; }
        .number { font: bold 22px sans-serif; fill: #333333; }
      </style>

      <!-- 均一な青色の枠線 -->
      <rect x="5" y="5" width="1190" height="620" fill="none" stroke="#4e79a7" stroke-width="10"/>

      <!-- 背景 -->
      <rect x="10" y="10" width="1180" height="610" fill="#f0f0f0"/>

      <!-- タイトル（2行） -->
      <text x="600" y="80" text-anchor="middle" class="title">${timeName} ${title}</text>
      <text x="600" y="130" text-anchor="middle" class="title">都道府県ランキング</text>

      <!-- ベスト5 テーブル -->
      <g transform="translate(60, 180)">
        <rect width="500" height="70" fill="#4e79a7"/>
        <text x="250" y="48" text-anchor="middle" class="header">ベスト5</text>
        ${generateRows(best5, bestColors, false)}
      </g>

      <!-- ワースト5 テーブル -->
      <g transform="translate(640, 180)">
        <rect width="500" height="70" fill="#e15759"/>
        <text x="250" y="48" text-anchor="middle" class="header">ワースト5</text>
        ${generateRows(worst5, worstColors, true)}
      </g>
    </svg>
  `
}

// 保存先のファイル名を生成
const generateFileName = (cardProps: CardProps, extension: string) => {
  const { fieldId, menuId, cardId } = cardProps
  const filename = `${cardId}_x.${extension}`
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

// SVGと最適化されたPNGを保存する関数
const saveSvgX = async (
  title: string,
  cardProps: CardProps,
  values: RankingValueType[]
) => {
  const svgString = generateSvg(title, values)
  const svgFilePath = generateFileName(cardProps, 'svg')
  const pngFilePath = generateFileName(cardProps, 'png')

  try {
    // ディレクトリが存在しない場合は作成
    await fs.mkdir(path.dirname(svgFilePath), { recursive: true })

    // SVGファイルを保存
    await fs.writeFile(svgFilePath, svgString, 'utf-8')
    console.log(`SVG file saved: ${svgFilePath}`)

    // SVGを最適化されたPNGに直接変換
    await sharp(Buffer.from(svgString)).png({ quality: 90 }).toFile(pngFilePath)

    console.log(`Optimized PNG file saved: ${pngFilePath}`)
  } catch (error) {
    console.error('Error saving SVG and optimized PNG:', error)
  }
}

export default saveSvgX
