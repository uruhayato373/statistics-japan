import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingGrossPrefecturalProduct from 'sections/economy/gross-production/prefecture-rank/RankingGrossPrefecturalProduct'
import { ViewsPropsType } from 'types/views'

export default async function GrossPrefecturalProduct({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 県内総生産 */}
      <PrefectureRankingCards
        Section={RankingGrossPrefecturalProduct}
        routerProps={routerProps}
      />
    </MainView>
  )
}
