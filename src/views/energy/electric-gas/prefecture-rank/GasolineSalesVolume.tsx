import RankingGasolineSalesVolume from 'sections/energy/electric-gas/prefecture-rank/RankingGasolineSalesVolume'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function GasolineSalesVolume({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* ガソリン販売量 */}
      <PrefectureRankingCards
        Section={RankingGasolineSalesVolume}
        routerProps={routerProps}
      />
    </MainView>
  )
}
