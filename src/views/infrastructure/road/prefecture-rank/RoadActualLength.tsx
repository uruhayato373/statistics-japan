import RankingRoadActualLength from 'sections/infrastructure/road/prefecture-rank/RankingRoadActualLength'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function RoadActualLength({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 道路実延長 */}
      <PrefectureRankingCards
        Section={RankingRoadActualLength}
        routerProps={routerProps}
      />
    </MainView>
  )
}
