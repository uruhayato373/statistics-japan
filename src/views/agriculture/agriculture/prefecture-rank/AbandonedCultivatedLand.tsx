import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAbandonedCultivatedLand from 'sections/agriculture/agriculture/prefecture-rank/RankingAbandonedCultivatedLand'
import { ViewsPropsType } from 'types/views'

export default async function AbandonedCultivatedLand({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 耕作放棄地面積 */}
      <PrefectureRankingCards
        Section={RankingAbandonedCultivatedLand}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
