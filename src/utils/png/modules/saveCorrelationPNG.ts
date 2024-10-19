import formatD3charts from 'utils/d3charts'
import { DocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'

import generateFilePath from './generateFilePath'
import generateScatterPlot from './ranking/ScatterPlot'
import savePNG from './savePNG'

const saveCorrelationPNG = async (
  title: string,
  routerProps: RouterProps,
  document: DocumentType
) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const contents = formatD3charts(document).scatterChart()

  const svgTableX = generateScatterPlot(title, contents)
  await savePNG(svgTableX, generateFilePath(routerProps, `${title}.png`))

  return
}

export default saveCorrelationPNG
