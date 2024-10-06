import RankingAbandonedCultivatedLand from 'sections/agriculture/agriculture/prefecture-rank/RankingAbandonedCultivatedLand'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function AbandonedCultivatedLand({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 耕作放棄地面積 */}
      <PrefectureRankingCards
        Section={RankingAbandonedCultivatedLand}
        routerProps={routerProps}
      />
    </MainView>
  )
}
