import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingIndustrialWaterVolume from 'sections/energy/industrial-water/prefecture-rank/RankingIndustrialWaterVolume'
import { ViewsPropsType } from 'types/views'

export default async function IndustrialWaterVolume({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 工業用水量 */}
      <PrefectureRankingCards
        Section={RankingIndustrialWaterVolume}
        routerProps={routerProps}
      />
    </MainView>
  )
}
