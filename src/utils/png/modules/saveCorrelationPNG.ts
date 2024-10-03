import formatD3charts from 'utils/d3charts'
import handleDocument from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

import generateFilePath from './generateFilePath'
import savePNG from './savePNG'
import generateScatterPlot from './svg/ScatterPlot'

const saveCorrelationPNG = async (
  title: string,
  routerProps: RouterProps,
  values: ValueType[]
) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { formatDocument } = handleDocument()
  const document = formatDocument(values, 'common')
  const contents = formatD3charts(document).scatterChart()

  const svgTableX = generateScatterPlot(title, contents)
  await savePNG(svgTableX, generateFilePath(routerProps, `${title}.png`))

  return
}

export default saveCorrelationPNG
