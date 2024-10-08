import RankingGrossPrefecturalProduct from 'sections/economy/gross-production/prefecture-rank/RankingGrossPrefecturalProduct'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function GrossPrefecturalProduct({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 県内総生産 */}
      <PrefectureRankingCards
        Section={RankingGrossPrefecturalProduct}
        routerProps={routerProps}
      />
    </MainView>
  )
}
