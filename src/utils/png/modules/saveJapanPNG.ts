import { DocumentType } from 'utils/document'

import generateFilePath from './generateFilePath'
import { generateAxisChartX } from './japan/axisChartX'
import savePNG from './savePNG'

import { RouterPropsType } from 'types/apps'

const saveJapanPNG = async (
  title: string,
  routerProps: RouterPropsType,
  document: DocumentType
) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  // X用のPNG（axisChart）を生成・保存（1200x630）
  const svgAxisChartX = generateAxisChartX(title, document)
  await savePNG(svgAxisChartX, generateFilePath(routerProps, 'axisChartX.png'))

  return
}

export default saveJapanPNG
