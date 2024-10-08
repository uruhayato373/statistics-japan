import RankingCityGasSalesVolume from 'sections/energy/electric-gas/prefecture-rank/RankingCityGasSalesVolume'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function CityGasSalesVolume({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 都市ガス販売量 */}
      <PrefectureRankingCards
        Section={RankingCityGasSalesVolume}
        routerProps={routerProps}
      />
    </MainView>
  )
}
