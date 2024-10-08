import RankingHealthyLifeExpectancyMan from 'sections/socialsecurity/health/prefecture-rank/RankingHealthyLifeExpectancyMan'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function HealthyLifeExpectancyMan({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 健康寿命（男性） */}
      <PrefectureRankingCards
        Section={RankingHealthyLifeExpectancyMan}
        routerProps={routerProps}
      />
    </MainView>
  )
}
