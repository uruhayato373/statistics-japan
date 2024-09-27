import path from 'path'

import sharp from 'sharp'

import prefectures from 'data/prefecture/prefList.json'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

import generatePrefectureSVG from './generatePrefectureSVG'

async function generatePNGFromSVG(
  svgString: string,
  outputPath: string
): Promise<void> {
  await sharp(Buffer.from(svgString)).png().toFile(outputPath)
}

function createFilePath(routerProps: RouterProps, fileName: string): string {
  const { fieldId, menuId, kindId } = routerProps
  return path.join(
    process.cwd(),
    'public',
    'ogp',
    fieldId,
    menuId,
    kindId,
    fileName
  )
}

async function processPrefecture(
  title: string,
  prefecture: PrefectureType,
  routerProps: RouterProps
): Promise<void> {
  const svgString = generatePrefectureSVG(title, prefecture)
  const pngFilePath = createFilePath(routerProps, `${prefecture.prefCode}.png`)
  await generatePNGFromSVG(svgString, pngFilePath)
}

export default async function savePrefecturePNG(
  title: string,
  routerProps: RouterProps
): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const tasks = prefectures.map((prefecture) =>
    processPrefecture(title, prefecture, routerProps)
  )
  await Promise.all(tasks)
}
