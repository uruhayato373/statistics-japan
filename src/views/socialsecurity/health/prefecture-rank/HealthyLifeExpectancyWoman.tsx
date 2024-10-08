import RankingHealthyLifeExpectancyWoman from 'sections/socialsecurity/health/prefecture-rank/RankingHealthyLifeExpectancyWoman'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
