import RankingCultivatedLandArea from 'sections/agriculture/agriculture/prefecture-rank/RankingCultivatedLandArea'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function CultivatedLandArea({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 耕地面積 */}
      <PrefectureRankingCards
        Section={RankingCultivatedLandArea}
        routerProps={routerProps}
      />
    </MainView>
  )
}
