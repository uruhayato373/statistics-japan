import RankingCatchAmount from 'sections/agriculture/fishing/prefecture-rank/RankingCatchAmount'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function CatchAmount({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 漁獲量 */}
      <PrefectureRankingCards
        Section={RankingCatchAmount}
        routerProps={routerProps}
      />
    </MainView>
  )
}
