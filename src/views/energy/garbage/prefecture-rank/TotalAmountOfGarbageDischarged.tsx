import RankingTotalAmountOfGarbageDischarged from 'sections/energy/garbage/prefecture-rank/RankingTotalAmountOfGarbageDischarged'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function TotalAmountOfGarbageDischarged({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* ごみ総排出量 */}
      <PrefectureRankingCards
        Section={RankingTotalAmountOfGarbageDischarged}
        routerProps={routerProps}
      />
    </MainView>
  )
}
