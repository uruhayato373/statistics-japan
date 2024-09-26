import fs from 'fs/promises'
import path from 'path'

import sharp from 'sharp'

import { CardProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

import generateChartInstagram from './svg/chartInstagram'
import generateChartX from './svg/chartX'
import generateTableInstagram from './svg/tableInstagram'
import generateTableX from './svg/tableX'

const saveBestWorstPNG = async (
  title: string,
  cardProps: CardProps,
  values: RankingValueType[]
) => {
  const bestValues = values.slice(0, 5)
  const worstValues = values.slice(-5).reverse()
  const timeName = values[0].timeName
  const svgTitle = `${timeName} ${title}`

  // X用のPNG（表形式）を生成・保存（1200x630）
  const svgTableX = generateTableX(svgTitle, bestValues, worstValues)
  await savePNG(svgTableX, generateFilePath(cardProps, 'tableX.png'))

  // Instagram用のPNG（表形式）を生成・保存（1080x1080）
  const svgTableInstagram = generateTableInstagram(
    svgTitle,
    bestValues,
    worstValues
  )
  await savePNG(
    svgTableInstagram,
    generateFilePath(cardProps, 'tableInstagram.png')
  )

  // X用のPNG（棒グラフ形式）を生成・保存（1200x630）
  const svgChartX = generateChartX(svgTitle, bestValues, worstValues)
  await savePNG(svgChartX, generateFilePath(cardProps, 'chartX.png'))

  // Instagram用のPNG（棒グラフ形式）を生成・保存（1080x1080）
  const svgChartInstagram = generateChartInstagram(
    svgTitle,
    bestValues,
    worstValues
  )
  await savePNG(
    svgChartInstagram,
    generateFilePath(cardProps, 'chartInstagram.png')
  )
}

export default saveBestWorstPNG

// SVGをPNGに変換して保存
const savePNG = async (svgString: string, filePath: string) => {
  try {
    // ディレクトリが存在しない場合は作成
    await fs.mkdir(path.dirname(filePath), { recursive: true })

    // SVGを最適化されたPNGに直接変換
    await sharp(Buffer.from(svgString)).png({ quality: 90 }).toFile(filePath)

    console.log(`Optimized PNG file saved: ${filePath}`)
  } catch (error) {
    console.error('Error saving SVG and optimized PNG:', error)
  }
}

// 保存先のファイル名を生成
const generateFilePath = (cardProps: CardProps, fileName: string) => {
  const { fieldId, menuId, cardId } = cardProps
  const filePath = path.join(
    process.cwd(),
    'local',
    'png',
    fieldId,
    menuId,
    'prefecture-rank',
    cardId,
    fileName
  )

  return filePath
}
