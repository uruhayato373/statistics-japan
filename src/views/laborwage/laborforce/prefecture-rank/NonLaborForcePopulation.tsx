import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNonLaborForcePopulation from 'sections/laborwage/laborforce/prefecture-rank/RankingNonLaborForcePopulation'
import { ViewsPropsType } from 'types/views'

export default async function NonLaborForcePopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 非労働力人口 */}
      <PrefectureRankingCards
        Section={RankingNonLaborForcePopulation}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
