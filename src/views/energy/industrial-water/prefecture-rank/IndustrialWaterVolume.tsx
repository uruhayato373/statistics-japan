import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingIndustrialWaterVolume from 'sections/energy/industrial-water/prefecture-rank/RankingIndustrialWaterVolume'

import { ViewsPropsType } from 'types/views'

export default async function IndustrialWaterVolume({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 工業用水量 */}
      <PrefectureRankingCards
        Section={RankingIndustrialWaterVolume}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
