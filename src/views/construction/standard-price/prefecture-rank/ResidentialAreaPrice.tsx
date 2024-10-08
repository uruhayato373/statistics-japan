import RankingResidentialAreaPrice from 'sections/construction/standard-price/prefecture-rank/RankingResidentialAreaPrice'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ResidentialAreaPrice({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 住宅地価格 */}
      <PrefectureRankingCards
        Section={RankingResidentialAreaPrice}
        routerProps={routerProps}
      />
    </MainView>
  )
}
