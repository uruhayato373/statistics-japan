import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingUrbanPlanningArea from 'sections/infrastructure/urban-planning/prefecture-rank/RankingUrbanPlanningArea'
import { ViewsPropsType } from 'types/views'

export default async function UrbanPlanningArea({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 都市計画区域指定面積 */}
      <PrefectureRankingCards
        Section={RankingUrbanPlanningArea}
        routerProps={routerProps}
      />
    </MainView>
  )
}
