import { DocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'
import calcRankingValues from 'utils/value/modules/calcRankingValues'

import saveBestWorstPNG from './modules/saveBestWorstPNG'
import saveCorrelationPNG from './modules/saveCorrelationPNG'

function formatRankingValues(document: DocumentType): ValueType[] {
  const { times, values } = document
  const latestTime = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )[0]

  const latestValues = values.filter((f) => f.timeCode === latestTime.timeCode)

  return calcRankingValues(latestValues)
}

const handlePNG = (
  title: string,
  routerProps: RouterProps,
  document: DocumentType
) => {
  const values = formatRankingValues(document)
  return {
    saveBestWorstPNG: async () =>
      await saveBestWorstPNG(title, routerProps, values),
    saveCorrelationPNG: async () =>
      await saveCorrelationPNG(title, routerProps, document),
  }
}

export default handlePNG
