import path from 'path'

import sharp from 'sharp'

import { RouterProps } from 'utils/props'

import generateJapanSVG from './generateJapanSVG'

export interface D3MapChartSeries {
  areaCode: string
  areaName: string
  value: number
  unit: string
}

function createFilePath(routerProps: RouterProps): string {
  const { fieldId, menuId, kindId } = routerProps
  return path.join(
    process.cwd(),
    'public',
    'ogp',
    fieldId,
    menuId,
    kindId,
    '00000.png'
  )
}

export default async function saveJapanPNG(
  title: string,
  routerProps: RouterProps
) {
  // SVGを生成
  const svgString = await generateJapanSVG(title)

  // SVGをPNGに変換して保存
  const pngFilePath = createFilePath(routerProps)
  await sharp(Buffer.from(svgString)).png().toFile(pngFilePath)

  return
}
