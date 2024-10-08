import RankingIndustrialAreaPrice from 'sections/construction/standard-price/prefecture-rank/RankingIndustrialAreaPrice'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function IndustrialAreaPrice({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 工業地価格 */}
      <PrefectureRankingCards
        Section={RankingIndustrialAreaPrice}
        routerProps={routerProps}
      />
    </MainView>
  )
}
