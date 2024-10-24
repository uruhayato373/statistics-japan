import sharp from 'sharp'

import handleAWS from 'utils/aws'
import handlePrefecture from 'utils/prefecture'
import { ValueType } from 'utils/value'

import generateJapanSVG from './generateJapanSVG'
import generatePrefectureRankSVG from './generatePrefectureRankSVG'
import generatePrefectureSVG from './generatePrefectureSVG'

import { RouterPropsType } from 'types/apps'

// japan
async function saveJapan(title: string, routerProps: RouterPropsType) {
  const svgString = generateJapanSVG(title)
  const pngBuffer = await sharp(Buffer.from(svgString)).png().toBuffer()
  const { saveOGP } = handleAWS(routerProps)

  await saveOGP(pngBuffer)
}

// prefecture
async function savePrefecture(title: string, routerProps: RouterPropsType) {
  const prefectures = handlePrefecture().fetchItems()

  const savePrefecturePromises = prefectures.map(async (prefecture) => {
    const svgString = generatePrefectureSVG(title, prefecture)
    const pngBuffer = await sharp(Buffer.from(svgString)).png().toBuffer()
    const { saveOGP } = handleAWS({
      ...routerProps,
      prefCode: prefecture.prefCode,
    })
    await saveOGP(pngBuffer)
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
  const pngBuffer = await sharp(Buffer.from(svgString)).png().toBuffer()
  const { saveOGP } = handleAWS(routerProps)

  await saveOGP(pngBuffer)
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
