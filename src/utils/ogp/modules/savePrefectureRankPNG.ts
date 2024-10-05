import fs from 'fs/promises'
import path from 'path'

import sharp from 'sharp'

import { RouterProps } from 'utils/props'
import { RankingValueType } from 'utils/value/modules/calcRankingValues'

import generatePrefectureRankSVG from './generatePrefectureRankSVG'

export interface D3MapChartSeries {
  areaCode: string
  areaName: string
  value: number
  unit: string
}

// 保存先のファイル名を生成
const generateFileName = (routerProps: RouterProps) => {
  const { fieldId, menuId, pageId } = routerProps
  const filename = `${pageId}.png`
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

async function ensureDirectoryExists(filePath: string) {
  const directory = path.dirname(filePath)
  try {
    await fs.access(directory)
  } catch (error) {
    // Directory doesn't exist, so create it
    await fs.mkdir(directory, { recursive: true })
  }
}

export default async function savePrefectureRankPNG(
  title: string,
  routerProps: RouterProps,
  values: RankingValueType[]
) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  // SVGを生成
  const svgString = await generatePrefectureRankSVG(title, values)

  // SVGをPNGに変換して保存
  const pngFilePath = generateFileName(routerProps)
  await ensureDirectoryExists(pngFilePath)
  await sharp(Buffer.from(svgString)).png().toFile(pngFilePath)

  return
}
