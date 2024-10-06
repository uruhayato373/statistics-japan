import RankingAgriculturalLandConversionArea from 'sections/agriculture/agriculture/prefecture-rank/RankingAgriculturalLandConversionArea'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function AgriculturalLandConversionArea({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 農地転用面積 */}
      <PrefectureRankingCards
        Section={RankingAgriculturalLandConversionArea}
        routerProps={routerProps}
      />
    </MainView>
  )
}
