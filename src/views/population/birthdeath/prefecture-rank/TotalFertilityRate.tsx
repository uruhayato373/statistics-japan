import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalFertilityRate from 'sections/population/birthdeath/prefecture-rank/RankingTotalFertilityRate'
import { ViewsPropsType } from 'types/views'

export default async function TotalFertilityRate({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 死亡数 */}
      <PrefectureRankingCards
        Section={RankingTotalFertilityRate}
        routerProps={routerProps}
      />
    </MainView>
  )
}
