import RankingIndustrialWaterVolume from 'sections/energy/industrial-water/prefecture-rank/RankingIndustrialWaterVolume'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
