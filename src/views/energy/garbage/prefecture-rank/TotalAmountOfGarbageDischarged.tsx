import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalAmountOfGarbageDischarged from 'sections/energy/garbage/prefecture-rank/RankingTotalAmountOfGarbageDischarged'
import { ViewsPropsType } from 'types/views'

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
