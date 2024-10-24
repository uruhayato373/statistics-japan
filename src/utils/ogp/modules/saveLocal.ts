import fs from 'fs/promises'
import path from 'path'

import sharp from 'sharp'

import handlePrefecture from 'utils/prefecture'
import { ValueType } from 'utils/value'

import generateJapanSVG from './generateJapanSVG'
import generatePrefectureRankSVG from './generatePrefectureRankSVG'
import generatePrefectureSVG from './generatePrefectureSVG'

import { RouterPropsType } from 'types/apps'

export interface D3MapChartSeries {
  areaCode: string
  areaName: string
  value: number
  unit: string
}

// 保存先のファイル名を生成
const generateFileName = (routerProps: RouterPropsType) => {
  const { fieldId, menuId, kindId, pageId, prefCode } = routerProps
  const filename = prefCode ? `${prefCode}.png` : `${pageId}.png`
  const filePath = path.join(
    process.cwd(),
    'local',
    'ogp',
    fieldId,
    menuId,
    kindId,
    filename
  )

  return filePath
}

async function ensureDirectoryExists(filePath: string) {
  const directory = path.dirname(filePath)
  try {
    await fs.access(directory)
  } catch (error) {
    await fs.mkdir(directory, { recursive: true })
  }
}

// japan
async function saveJapan(title: string, routerProps: RouterPropsType) {
  const svgString = generateJapanSVG(title)
  const pngFilePath = generateFileName({ ...routerProps, prefCode: '00000' })
  await ensureDirectoryExists(pngFilePath)
  await sharp(Buffer.from(svgString)).png().toFile(pngFilePath)
}

// prefecture
async function savePrefecture(title: string, routerProps: RouterPropsType) {
  const prefectures = handlePrefecture().fetchItems()

  const savePrefecturePromises = prefectures.map(async (prefecture) => {
    const svgString = generatePrefectureSVG(title, prefecture)
    const pngFilePath = generateFileName({
      ...routerProps,
      prefCode: prefecture.prefCode,
    })
    await ensureDirectoryExists(pngFilePath)
    await sharp(Buffer.from(svgString)).png().toFile(pngFilePath)
  })

  await Promise.all(savePrefecturePromises)
}

// prefecture-rank
async function savePrefectureRank(
  title: string,
  routerProps: RouterPropsType,
  values: ValueType[]
) {
  const svgString = await generatePrefectureRankSVG(title, values)
  const pngFilePath = generateFileName(routerProps)
  await ensureDirectoryExists(pngFilePath)
  await sharp(Buffer.from(svgString)).png().toFile(pngFilePath)
}

export default async function saveSupabase(
  title: string,
  routerProps: RouterPropsType,
  values?: ValueType[]
) {
  const { kindId } = routerProps

  switch (kindId) {
    case 'japan':
      await saveJapan(title, routerProps)
      break
    case 'prefecture':
      await savePrefecture(title, routerProps)
      break
    case 'prefecture-rank':
      await savePrefectureRank(title, routerProps, values)
      break
    default:
      break
  }

  return
}
