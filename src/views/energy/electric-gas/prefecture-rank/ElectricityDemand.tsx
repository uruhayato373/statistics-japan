import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingElectricityDemand from 'sections/energy/electric-gas/prefecture-rank/RankingElectricityDemand'
import { ViewsPropsType } from 'types/views'

export default async function ElectricityDemand({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 電力需要量 */}
      <PrefectureRankingCards
        Section={RankingElectricityDemand}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
