import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingForestArea from 'sections/landweather/area/prefecture-rank/RankingForestArea'
import { ViewsPropsType } from 'types/views'

export default async function ForestArea({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 森林面積 */}
      <PrefectureRankingCards
        Section={RankingForestArea}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
