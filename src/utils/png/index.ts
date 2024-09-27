import { RouterProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

import saveBestWorstPNG from './modules/saveBestWorstPNG'
import saveCorrelationPNG from './modules/saveCorrelationPNG'

const handlePNG = () => {
  return {
    saveBestWorstPNG: async (
      title: string,
      routerProps: RouterProps,
      values: RankingValueType[]
    ) => await saveBestWorstPNG(title, routerProps, values),
    saveCorrelationPNG: async (
      title: string,
      routerProps: RouterProps,
      values: RankingValueType[]
    ) => await saveCorrelationPNG(title, routerProps, values),
  }
}

export default handlePNG
