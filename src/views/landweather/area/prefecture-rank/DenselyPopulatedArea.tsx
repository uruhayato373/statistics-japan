import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingDenselyPopulatedArea from 'sections/landweather/area/prefecture-rank/RankingDenselyPopulatedArea'
import { ViewsPropsType } from 'types/views'

export default async function DenselyPopulatedArea({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 人口集中地区面積 */}
      <PrefectureRankingCards
        Section={RankingDenselyPopulatedArea}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
