import handleDocument from 'utils/document'
import { RouterProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

import generateFilePath from './generateFilePath'
import savePNG from './savePNG'
import generateScatterPlot from './svg/ScatterChart'

const saveCorrelationPNG = async (
  title: string,
  routerProps: RouterProps,
  values: RankingValueType[]
) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { formatDocument } = handleDocument()
  const document = formatDocument(values, 'common')

  const { areas } = document

  const test = areas.map((d) => {
    const areaValues = values.filter((v) => v.areaCode === d.areaCode)

    return {
      x: areaValues[0].value,
      y: areaValues[1].value,
    }
  })

  const svgTableX = generateScatterPlot(test)
  await savePNG(svgTableX, generateFilePath(routerProps, 'test.png'))

  return
}

export default saveCorrelationPNG
