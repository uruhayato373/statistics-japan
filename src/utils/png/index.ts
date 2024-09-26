import { CardProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

import saveBestWorstPNG from './modules/best-worst'

const handlePNG = () => {
  return {
    saveBestWorstPNG: async (
      title: string,
      cardProps: CardProps,
      values: RankingValueType[]
    ) => await saveBestWorstPNG(title, cardProps, values),
  }
}

export default handlePNG
