import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingCultivatedLandArea from 'sections/agriculture/agriculture/prefecture-rank/RankingCultivatedLandArea'
import { ViewsPropsType } from 'types/views'

export default async function CultivatedLandArea({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 耕地面積 */}
      <PrefectureRankingCards
        Section={RankingCultivatedLandArea}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
