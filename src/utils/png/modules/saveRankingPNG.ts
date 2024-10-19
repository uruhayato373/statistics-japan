import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

import generateFilePath from './generateFilePath'
import generateChartInstagram from './ranking/chartInstagram'
import generateChartX from './ranking/chartX'
import generateMapInstagram from './ranking/mapInstagram'
import generateTableInstagram from './ranking/tableInstagram'
import generateTableTickTok from './ranking/tableTickTok'
import generateTableX from './ranking/tableX'
import savePNG from './savePNG'

const saveRankingPNG = async (
  title: string,
  routerProps: RouterProps,
  values: ValueType[]
) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  if (!values.length) {
    return
  }

  const bestValues = values.slice(0, 5)
  const worstValues = values.slice(-5).reverse()
  const timeName = values[0].timeName
  const svgTitle = `${timeName} ${title}`

  // X用のPNG（表形式）を生成・保存（1200x630）
  const svgTableX = generateTableX(svgTitle, bestValues, worstValues)
  await savePNG(svgTableX, generateFilePath(routerProps, 'tableX.png'))

  // Instagram用のPNG（表形式）を生成・保存（1080x1080）
  const svgTableInstagram = generateTableInstagram(
    svgTitle,
    bestValues,
    worstValues
  )
  await savePNG(
    svgTableInstagram,
    generateFilePath(routerProps, 'tableInstagram.png')
  )

  // X用のPNG（棒グラフ形式）を生成・保存（1200x630）
  const svgChartX = generateChartX(svgTitle, bestValues, worstValues)
  await savePNG(svgChartX, generateFilePath(routerProps, 'chartX.png'))

  // Instagram用のPNG（棒グラフ形式）を生成・保存（1080x1080）
  const svgChartInstagram = generateChartInstagram(
    svgTitle,
    bestValues,
    worstValues
  )
  await savePNG(
    svgChartInstagram,
    generateFilePath(routerProps, 'chartInstagram.png')
  )

  // TickTok用のPNG（表形式）を生成・保存（1080x1920）
  const svgTableTickTok = generateTableTickTok(svgTitle, values)
  await savePNG(
    svgTableTickTok,
    generateFilePath(routerProps, 'tableTickTok.png')
  )

  // Instagram用のPNG（地図形式）を生成・保存（1080x1080）
  const svgMapInstagram = generateMapInstagram(svgTitle, values)
  await savePNG(
    svgMapInstagram,
    generateFilePath(routerProps, 'mapInstagram.png')
  )

  return
}

export default saveRankingPNG
