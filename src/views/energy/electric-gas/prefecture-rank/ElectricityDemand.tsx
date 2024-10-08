import RankingElectricityDemand from 'sections/energy/electric-gas/prefecture-rank/RankingElectricityDemand'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ElectricityDemand({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 電力需要量 */}
      <PrefectureRankingCards
        Section={RankingElectricityDemand}
        routerProps={routerProps}
      />
    </MainView>
  )
}
