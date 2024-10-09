import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingPrefecturalIncome from 'sections/economy/gross-production/prefecture-rank/RankingPrefecturalIncome'
import { ViewsPropsType } from 'types/views'

export default async function PrefecturalIncome({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 県民所得 */}
      <PrefectureRankingCards
        Section={RankingPrefecturalIncome}
        routerProps={routerProps}
      />
    </MainView>
  )
}
