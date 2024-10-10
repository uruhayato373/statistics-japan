import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingLaborForcePopulation from 'sections/laborwage/laborforce/prefecture-rank/RankingLaborForcePopulation'
import { ViewsPropsType } from 'types/views'

export default async function LaborForcePopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 労働力人口 */}
      <PrefectureRankingCards
        Section={RankingLaborForcePopulation}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
