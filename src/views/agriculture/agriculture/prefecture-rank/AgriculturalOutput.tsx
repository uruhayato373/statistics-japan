import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAgriculturalOutput from 'sections/agriculture/agriculture/prefecture-rank/RankingAgriculturalOutput'

import { ViewsPropsType } from 'types/views'

export default async function AgriculturalOutput({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 農業産出額 */}
      <PrefectureRankingCards
        Section={RankingAgriculturalOutput}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
