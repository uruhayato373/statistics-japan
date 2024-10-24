import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingGeneratedPowerAmount from 'sections/energy/electric-gas/prefecture-rank/RankingGeneratedPowerAmount'

import { ViewsPropsType } from 'types/views'

export default async function GeneratedPowerAmount({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 発電電力量 */}
      <PrefectureRankingCards
        Section={RankingGeneratedPowerAmount}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
