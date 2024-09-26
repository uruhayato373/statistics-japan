import { CardProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

import generateFilePath from './modules/generateFilePath'
import savePNG from './modules/savePNG'
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
