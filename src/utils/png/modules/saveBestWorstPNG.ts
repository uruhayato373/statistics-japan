import { actionSaveJson } from 'actions/saveJson'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

import generateFilePath from './generateFilePath'
import savePNG from './savePNG'
import generateChartInstagram from './svg/chartInstagram'
import generateChartX from './svg/chartX'
import generateTableInstagram from './svg/tableInstagram'
import generateTableX from './svg/tableX'

const saveBestWorstPNG = async (
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

  console.log(values)
  await actionSaveJson(values, 'values.json')

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

  return
}

export default saveBestWorstPNG
