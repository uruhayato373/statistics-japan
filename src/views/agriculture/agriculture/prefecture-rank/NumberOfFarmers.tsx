import RankingNumberOfFarmers from 'sections/agriculture/agriculture/prefecture-rank/RankingNumberOfFarmers'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfFarmers({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 農家数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfFarmers}
        routerProps={routerProps}
      />
    </MainView>
  )
}
