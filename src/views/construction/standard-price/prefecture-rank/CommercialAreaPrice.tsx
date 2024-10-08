import RankingCommercialAreaPrice from 'sections/construction/standard-price/prefecture-rank/RankingCommercialAreaPrice'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function CommercialAreaPrice({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 商業地価格 */}
      <PrefectureRankingCards
        Section={RankingCommercialAreaPrice}
        routerProps={routerProps}
      />
    </MainView>
  )
}
