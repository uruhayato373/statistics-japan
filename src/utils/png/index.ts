import { DocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value/modules/calcRankingValues'

import saveBestWorstPNG from './modules/saveBestWorstPNG'
import saveCorrelationPNG from './modules/saveCorrelationPNG'

const handlePNG = () => {
  return {
    saveBestWorstPNG: async (
      title: string,
      routerProps: RouterProps,
      values: ValueType[]
    ) => await saveBestWorstPNG(title, routerProps, values),
    saveCorrelationPNG: async (
      title: string,
      routerProps: RouterProps,
      document: DocumentType
    ) => await saveCorrelationPNG(title, routerProps, document),
  }
}

export default handlePNG
