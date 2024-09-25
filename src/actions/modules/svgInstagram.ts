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
      <g transform="translate(0, ${65 + index * 60})">
        <rect width="80" height="60" fill="${colors[index]}" stroke="white"/>
        <rect x="80" width="520" height="60" fill="${colors[index]}" stroke="white"/>
        <rect x="600" width="300" height="60" fill="${colors[index]}" stroke="white"/>
        <text x="40" y="40" text-anchor="middle" class="cell">${isWorst ? 47 - index : item.rank}</text>
        <text x="340" y="40" text-anchor="middle" class="cell">${item.areaName}</text>
        <text x="750" y="40" text-anchor="middle" class="number">${item.value.toLocaleString()} ${item.unit}</text>
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
  </style>

  <!-- 均一な青色の枠線 -->
  <rect x="5" y="5" width="1070" height="1070" fill="none" stroke="#4e79a7" stroke-width="10"/>

  <!-- 背景 -->
  <rect x="10" y="10" width="1060" height="1060" fill="#f0f0f0"/>

  <!-- タイトル（2行） -->
  <text x="540" y="120" text-anchor="middle" class="title">${timeName} ${title}</text>
  <text x="540" y="170" text-anchor="middle" class="title">都道府県ランキング</text>

  <!-- ベスト5 テーブル -->
  <g transform="translate(90, 220)">
    <rect width="900" height="65" fill="#4e79a7"/>
    <text x="450" y="45" text-anchor="middle" class="header">ベスト5</text>
    ${generateRows(best5, bestColors, false)}
  </g>

  <!-- ワースト5 テーブル -->
  <g transform="translate(90, 630)">
    <rect width="900" height="65" fill="#e15759"/>
    <text x="450" y="45" text-anchor="middle" class="header">ワースト5</text>
    ${generateRows(worst5, worstColors, true)}
  </g>
</svg>
  `
}

// 保存先のファイル名を生成
const generateFileName = (cardProps: CardProps, extension: string) => {
  const { fieldId, menuId, cardId } = cardProps
  const filename = `${cardId}_instagram.${extension}`
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

const saveSvgInstagram = async (
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

    // SVGをPNGに変換
    await sharp(Buffer.from(svgString)).png().toFile(pngFilePath)

    console.log(`PNG file saved: ${pngFilePath}`)
  } catch (error) {
    console.error('Error saving SVG and PNG:', error)
  }
}

export default saveSvgInstagram
