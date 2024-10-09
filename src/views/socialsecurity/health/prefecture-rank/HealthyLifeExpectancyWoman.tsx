import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingHealthyLifeExpectancyWoman from 'sections/socialsecurity/health/prefecture-rank/RankingHealthyLifeExpectancyWoman'
import { ViewsPropsType } from 'types/views'

export default async function HealthyLifeExpectancyWoman({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 健康寿命（女性） */}
      <PrefectureRankingCards
        Section={RankingHealthyLifeExpectancyWoman}
        routerProps={routerProps}
      />
    </MainView>
  )
}
