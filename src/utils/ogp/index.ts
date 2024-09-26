import { CardProps, RouterProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

import saveJapanPNG from './modules/saveJapanPNG'
import savePrefecturePNG from './modules/savePrefecturePNG'
import savePrefectureRankPNG from './modules/savePrefectureRankPNG'

const handleOGP = () => {
  return {
    savePrefectureRankOGP: async (
      title: string,
      cardProps: CardProps,
      values: RankingValueType[]
    ) => await savePrefectureRankPNG(title, cardProps, values),
    savePrefectureOGP: async (title: string, routerProps: RouterProps) =>
      await savePrefecturePNG(title, routerProps),
    saveJapanOGP: async (title: string, routerProps: RouterProps) =>
      await saveJapanPNG(title, routerProps),
  }
}

export default handleOGP
