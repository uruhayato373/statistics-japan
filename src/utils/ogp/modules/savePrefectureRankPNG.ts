/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import path from 'path'

import sharp from 'sharp'

import { CardProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

import generatePrefectureRankSVG from './generatePrefectureRankSVG'

export interface D3MapChartSeries {
  areaCode: string
  areaName: string
  value: number
  unit: string
}

// 保存先のファイル名を生成
const generateFileName = (cardProps: CardProps) => {
  const { fieldId, menuId, cardId } = cardProps
  const filename = `${cardId}.png`
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

export async function savePrefectureRankPNG(
  title: string,
  cardProps: CardProps,
  values: RankingValueType[]
) {
  // SVGを生成
  const svgString = generatePrefectureRankSVG(title, cardProps, values)

  // SVGをPNGに変換して保存
  const pngFilePath = generateFileName(cardProps)
  await sharp(Buffer.from(svgString)).png().toFile(pngFilePath)

  return
}
